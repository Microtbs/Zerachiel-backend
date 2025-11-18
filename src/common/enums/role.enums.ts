/**
 * Ruoli utilizzati per autorizzare gli endpoint applicativi.
 * Sono organizzati in ordine di privilegio crescente.
 */
export enum RoleType {
  USER = 'user',
  CARETAKER = 'caretaker',
  STONEMASON = 'stonemason',
  OFFICER = 'officer',
  ADMIN = 'admin',
}
