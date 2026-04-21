import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Min,
  IsArray,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductionEquipmentMinimalDto {
  @IsUUID('4', { message: 'O ID do equipamento deve ser um UUID válido' })
  equipmentId: string;

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  quantity: number;

  @IsDateString()
  usageDate: Date;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  customDailyCost?: number;
}

export class CreateProductionDto {
  @ApiProperty({
    description: 'Tipo da entrega ou etapa da produção',
    example: 'Filmagem Externa'
  })
  @IsString()
  @IsNotEmpty({ message: 'O tipo de produção é obrigatório' })
  @Length(3, 100)
  type: string;

  @ApiProperty({
    description: 'Custo estimado ou real desta etapa',
    example: 1200.50
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(0)
  @IsOptional() // Pode ser preenchido depois conforme o gasto real
  cost?: number;

  @ApiProperty({
    description: 'Data e hora de início da produção',
    example: '2026-04-10T08:00:00Z'
  })
  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    description: 'Data e hora prevista para término',
    example: '2026-04-12T18:00:00Z'
  })
  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @ApiProperty({
    description: 'Observações técnicas ou detalhes da entrega',
    example: 'Necessário levar drone e baterias extras.',
    required: false
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    description: 'ID do projeto ao qual esta produção pertence',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  })
  @IsUUID('4', { message: 'O ID do projeto deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O vínculo com um projeto é obrigatório' })
  projectId: string;

  @ApiProperty({ required: false, description: 'Equipamentos alocados na produção' })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductionEquipmentMinimalDto)
  productionEquipments?: ProductionEquipmentMinimalDto[];
}