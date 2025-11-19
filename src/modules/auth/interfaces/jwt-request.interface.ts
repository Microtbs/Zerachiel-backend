export interface JwtRequest extends Request {
  user: {
    id: number;
    roles: string;
  };
}
