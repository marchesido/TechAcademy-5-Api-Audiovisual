import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectEquipmentsModule } from './project-equipments/project-equipments.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { ProductionsModule } from './productions/productions.module';
import { ProjectsModule } from './projects/projects.module';
import { ClientsModule } from './clients/clients.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      entities: [__dirname + '/database/core/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
    }),
    ClientsModule,
    ProjectsModule,
    ProductionsModule,
    EquipmentsModule,
    ProjectEquipmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
