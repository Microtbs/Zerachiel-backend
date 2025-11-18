# Zerachiel Backend

> API NestJS per digitalizzare la gestione del cimitero comunale: ricerca tombe, richieste di manutenzione, invio di fiori digitali e flussi di autenticazione sicuri.

## Indice

1. [Panoramica](#panoramica)
2. [Architettura Applicativa](#architettura-applicativa)
3. [Moduli principali](#moduli-principali)
4. [Relazioni e flussi dati](#relazioni-e-flussi-dati)
5. [Flussi funzionali chiave](#flussi-funzionali-chiave)
6. [Configurazione e variabili d'ambiente](#configurazione-e-variabili-dambiente)
7. [Setup & comandi](#setup--comandi)
8. [Testing e qualità](#testing-e-qualità)
9. [Deployment](#deployment)
10. [Struttura cartelle](#struttura-cartelle)

## Panoramica

- Backend costruito con NestJS 11, TypeORM e PostgreSQL.
- Gestione ruoli gerarchica (`user` → `admin`) tramite guard personalizzati.
- Mailing asincrono per verifica email e recupero password.
- Feature principali: gestione tombe/defunti, uffici comunali, messaggi di manutenzione, fiori digitali e profili utente.

## Architettura Applicativa

- **NestJS + Dependency Injection**: ogni feature è un modulo isolato con controller, service ed entity dedicati.
- **TypeORM**: mapping esplicito delle entità (Account, Grave, RequestOffice, ecc.) e gestione automatica delle relazioni.
- **Security Layer**: JWT strategy (`JwtAuthGuard`) + `RolesGuard` che applica una gerarchia di privilegi.
- **MailerModule**: configurato tramite `MailConfig` per inviare OTP e link di recupero.
- **ConfigModule globale**: tutte le variabili `.env` sono disponibili ovunque senza reimport.

## Moduli principali

| Modulo                 | Responsabilità                                                             | Dipendenze dirette                       |
| ---------------------- | -------------------------------------------------------------------------- | ---------------------------------------- |
| `AccountsModule`       | CRUD profili, gestione password/email, esposizione DTO per altri servizi   | TypeORM `Account`, `bcrypt`              |
| `AuthModule`           | Registrazione con verifica OTP, login JWT, recupero password               | Accounts, Roles, Mail                    |
| `RolesModule`          | Definizione ruoli e assegnazioni agli account (tabella ponte `user_roles`) | Accounts                                 |
| `MessagesModule`       | Richieste/feedback verso gli uffici comunali, filtri per stato/tipo        | RequestOffices, Accounts                 |
| `GravesModule`         | Gestione tombe, coordinate e stato manutentivo                             | RequestOffices, DigitalFlowers, Deceased |
| `DeceasedModule`       | Anagrafiche defunti collegate alle tombe                                   | Graves                                   |
| `MunicipalitiesModule` | Censimento comuni, contatti e uffici                                       | MunicipalityContacts, RequestOffices     |
| `RequestOfficesModule` | Uffici comunali che ricevono messaggi/assegnazioni                         | Municipalities                           |
| `DigitalFlowersModule` | Invio di tributi digitali con storicizzazione (account → tomba)            | Accounts, Graves                         |
| `MailModule`           | SMTP wrapper per inviare email transazionali                               | ConfigModule                             |

## Flussi funzionali chiave

### Registrazione & verifica email

1. `POST /auth/register` salva la richiesta in una mappa in-memory con cooldown, genera un OTP a 6 cifre e invia la mail.
2. `GET /auth/verify?token=` valida l'OTP, crea l'account hashando la password e assegna il ruolo `user`.

### Login & autorizzazione

- `POST /auth/login` verifica le credenziali, sceglie il ruolo di priorità più alta e firma un JWT.
- Il token viene inviato sia nell'header `Authorization` che in un cookie HttpOnly.
- I controller applicano `@UseGuards(JwtAuthGuard, RolesGuard)` e `@Roles(...)` per bloccare endpoint sensibili.

### Messaggi di servizio

- `MessagesService` usa `plainToInstance` per restituire DTO sanitizzati con sender/receiver.
- Filtri disponibili: per `message_type`, tipo (`clean`, `maintenance`, ...), stato (`sent`, `completed`, ...).

### Fiori digitali

- `POST /digital_flowers` permette agli utenti autenticati di dedicare un tributo a una tomba, mantenendo la cronologia.
- I dati vengono arricchiti con il defunto associato alla tomba per il rendering frontend.

### Gestione enti e tombe

- I comuni hanno un contatto (`MunicipalityContact`) e uno o più uffici richiesta (`RequestOffice`).
- Le tombe sono collegate a un ufficio (per tracciarne la responsabilità) e a più defunti/digital flowers.

## Configurazione e variabili d'ambiente

| Variabile                               | Descrizione                                                            |
| --------------------------------------- | ---------------------------------------------------------------------- |
| `PORT`                                  | Porta HTTP esposta da Nest (default 3000).                             |
| `DATABASE_URL`                          | Connessione PostgreSQL ( formato `postgres://user:pass@host:port/db`). |
| `JWT_SECRET` / `JWT_EXPIRES`            | Chiave e TTL del token.                                                |
| `APP_URL`                               | URL pubblico usato nei link email (verify/reset).                      |
| `MAIL_HOST`, `MAIL_PORT`, `MAIL_SECURE` | Parametri SMTP.                                                        |
| `MAIL_USER`, `MAIL_PASS`, `MAIL_FROM`   | Credenziali e mittente predefinito.                                    |

> Le impostazioni SMTP sono centralizzate in `MailConfig`, mentre la configurazione TypeORM è definita in `src/configs/ormconfig.ts` e riusata dalla CLI.

## Setup & comandi

```bash
# installazione dipendenze
pnpm install

# sviluppo
pnpm run start:dev

# produzione (build + avvio)
pnpm run build && pnpm run start:prod

# linting e formattazione
pnpm run lint
pnpm run format
```

## Testing e qualità

- **Unit test** (`pnpm run test`) e **coverage** (`pnpm run test:cov`) tramite Jest + ts-jest.
- **E2E test** di esempio in `test/app.e2e-spec.ts`; estendere simulando gli scenari più critici (auth, messaggi, autorizzazioni).
- ValidationPipe globale + class-validator sulle DTO riducono la necessità di controlli manuali.

## Deployment

- Il file `vercel.json` consente il deploy serverless su Vercel (`@vercel/node`) puntando all'entry `src/main.ts`.
- Per ambienti containerizzati è sufficiente esportare le stesse variabili `.env` e lanciare `pnpm run start:prod`.

## Struttura cartelle

- `src/main.ts` – bootstrap Nest con ValidationPipe e ConfigService.
- `src/app.module.ts` – aggrega tutti i moduli funzionali.
- `src/configs/` – configurazioni riutilizzabili (TypeORM, Mailer, JWT).
- `src/modules/**` – cartelle verticali per feature (controller/service/module/dto/entity).
- `test/` – suite e2e Jest pronta per essere estesa.

---
