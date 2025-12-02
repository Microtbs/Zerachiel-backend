function validateJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('FATAL: JWT_SECRET environment variable is required');
  }

  if (secret.length < 32) {
    throw new Error('FATAL: JWT_SECRET must be at least 32 characters long');
  }

  return secret;
}

export const jwtConfig: { secret: string; expiresIn: string } = {
  secret: validateJwtSecret(),
  expiresIn: process.env.JWT_EXPIRES ?? '3600s',
};
