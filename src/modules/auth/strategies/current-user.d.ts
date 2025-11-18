import { RoleType } from 'src/common/enums/role.enums';

/**
 * Tipizzazione di comodo per l'oggetto utente iniettato nei request handlers.
 */
export type CurrentUser = {
  id: number;
  roles: RoleType[];
};
