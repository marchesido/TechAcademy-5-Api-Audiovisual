import { Module } from '@nestjs/common';
import { ProductionsService } from './productions.service';
import { ProductionsController } from './productions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Production } from './entities/production.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Production])],
  controllers: [ProductionsController],
  providers: [ProductionsService],
})
export class ProductionsModule {}
