import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

const {
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT,
} = process.env;

export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: POSTGRES_HOST,
      port: parseInt(POSTGRES_PORT, 10),
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],

      // We are using migrations, synchronize should be set to false while production.
      synchronize: true,
      // Allows to reset database each time app init, shoul be set to false while production.
      dropSchema: false,

      // Run migrations automatically,
      // you can disable this if you prefer running migration manually.
      migrationsRun: false,
      logging: true,
      logger: 'file',
    
      // Allow both start:prod and start:dev to use migrations
      // __dirname is either dist or src folder, meaning either
      // the compiled js in prod or the ts in dev.
      migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
      cli: {
          // Location of migration should be inside src folder
          // to be compiled into dist/ folder.
          migrationsDir: 'src/migrations',
      }
    };
  }
}
