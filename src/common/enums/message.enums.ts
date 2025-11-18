/**
 * Stato operativo della richiesta lungo il ciclo di gestione.
 */
export enum msgStatus {
  SENT = 'sent',
  TAKEN = 'taken',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
}

/**
 * Tipologia di intervento richiesto.
 */
export enum msgType {
  CLEAN = 'clean',
  MAINTENANCE = 'maintenance',
  EXAMINATION = 'examination',
  CREATE = 'create',
  OTHER = 'other',
}

/**
 * Macro-categoria del messaggio (richiesta VS feedback).
 */
export enum message_type {
  REQUEST = 'request',
  FEEDBACK = 'feedback',
}
