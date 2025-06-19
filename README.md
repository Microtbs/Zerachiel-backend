# Gestione Cimitero

## Indice
- [Backend](#backend)
  - [NestJS](#nestjs)
  - [TypeORM](#typeorm)
- [Database](#database)
  - [PostgreSQL](#postgresql)
- [Uso](#uso)
  - [Setup progetto](#setup-progetto)
  - [NestJS – Avvio progetto](#nestjs--avvio-progetto)
  - [NestJS – Test](#nestjs--test)


## Descrizione Progetto
> L’app <b>Zerachiel</b> nasce per offrire ai cittadini uno strumento digitale intuitivo per <b>trovare e raggiungere facilmente le tombe dei propri cari</b> all'interno del cimitero comunale di Trapani. Grazie a una <b>mappa interattiva</b> e un <b>sistema di navigazione intelligente</b>, i visitatori potranno individuare rapidamente la posizione esatta della tomba e ricevere indicazioni per raggiungerla senza difficoltà.

### Funzionalità Principali
- **Ricerca Avanzata ->** Trova la tomba inserendo nome e cognome del defunto
- **Mappa Interattiva ->** Visualizza l'intera area cimiteriale con settori ben definiti
- **Navigazione Guidata ->** Ottieni indicazioni precise per raggiungere la posizione desiderata
- **Scheda Defunto ->** Consulta informazioni come data di nascita e decesso

### Obiettivo

> L’app semplifica la visita al cimitero, rendendo la ricerca più veloce ed evitando disorientamenti. Un supporto tecnologico moderno, pensato per rendere l’esperienza più serena e accessibile per tutti.

# Stack Tecnologico

## Backend

### <p align="center"><a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="80" alt="NestJS" /></a></p>
 > NestJS segue il pattern MVC e incoraggia la separazione delle responsabilità. Supporta micro‑servizi, REST, GraphQL e WebSocket, fornendo un potente sistema di dependency‑injection e tooling CLI per scaffolding. 

### <p align="center"><a href="https://typeorm.io/" target="blank">TypeORM</a></p>
 > TypeORM gestisce la persistenza dei dati su PostgreSQL attraverso un approccio DataMapper/ActiveRecord, migrazioni automatiche e query builder tipizzato. 

## Database

### <p align="center"><a href="https://www.postgresql.org/" target="blank">PostgreSQL </p>
> PostgreSQL è un database relazionale open‑source ACID‑compliant. Utilizzato per la persistenza dei dati delle tombe, dei lotti e degli utenti, con estensioni geospaziali (PostGIS) per la gestione delle coordinate all’interno del cimitero.

## Uso

### Project Setup
```bash
$ pnpm install
```

## NestJS - Compile and run the project
```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
## NestJS - Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
