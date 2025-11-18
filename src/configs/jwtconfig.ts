/**
 * Configurazione riutilizzabile per JWT Strategy/Module.
 * Recuperiamo il segreto e la durata dal runtime per evitare di replicare valori hard-coded.
 */
export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES ?? '3600s',
};
