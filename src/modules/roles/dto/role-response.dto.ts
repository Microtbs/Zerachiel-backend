/**
 * Descrive la forma di un ruolo restituito ai client.
 */
export class RoleDto {
  id: number;
  type: string;
  details?: string;
}

export class UserRoleDto {
  id: number;
  role: RoleDto;
}
