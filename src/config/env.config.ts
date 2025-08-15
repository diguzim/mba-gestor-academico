import { ConfigType, registerAs } from '@nestjs/config';

export const envConfigRegistration = registerAs('', () => ({
  environment: process.env.NODE_ENV!,
  database: {
    host: process.env.DATABASE_HOST!,
    port: parseInt(process.env.DATABASE_PORT!),
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    name: process.env.DATABASE_NAME!,
    synchronize: process.env.DATABASE_SYNCHRONIZE! === 'true',
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
  },
}));

// Create and export this type: ConfigType<typeof envConfig>
export type EnvConfig = ConfigType<typeof envConfigRegistration>;
