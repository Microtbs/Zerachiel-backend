/**
 * Descrive la forma di un ruolo restituito ai client.
 */
export class RoleDTO {
  id: number;
  type: string;
  details?: string;
}

export class UserRoleDTO {
  id: number;
  role: RoleDTO;
}
