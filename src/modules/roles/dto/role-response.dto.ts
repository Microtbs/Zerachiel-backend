export class RoleDTO {
  id: number;
  type: string;
  details?: string;
}

export class UserRoleDTO {
  id: number;
  role: RoleDTO;
}
