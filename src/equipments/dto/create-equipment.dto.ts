import { ApiProperty } from '@nestjs/swagger';
import { 
  IsDateString, 
  IsEnum, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsString, 
  Length, 
  Min 
} from 'class-validator';

export enum EquipmentStatus {
  AVAILABLE = 'available',
  IN_USE = 'in_use',
  MAINTENANCE = 'maintenance'
}

export class CreateEquipmentDto {
  @ApiProperty({ 
    description: 'Nome do equipamento (Ex: Câmera, Lente, Tripé)', 
    example: 'Sony Alpha A7IV' 
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome do equipamento é obrigatório' })
  @Length(3, 150)
  name: string;

  @ApiProperty({ 
    description: 'Categoria do item para organização', 
    example: 'Câmeras' 
  })
  @IsString()
  @IsNotEmpty({ message: 'A categoria é obrigatória' })
  @Length(2, 100)
  category: string;

  @ApiProperty({ 
    description: 'Número de série único do fabricante', 
    example: 'SN123456789',
    required: false 
  })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  serialNumber?: string;

  @ApiProperty({ 
    description: 'Data de aquisição do equipamento', 
    example: '2024-03-07',
    required: false 
  })
  @IsDateString({}, { message: 'A data de compra deve estar no formato ISO (AAAA-MM-DD)' })
  @IsOptional()
  purchaseDate?: Date;

  @ApiProperty({ 
    description: 'Status atual do equipamento', 
    enum: EquipmentStatus,
    default: EquipmentStatus.AVAILABLE 
  })
  @IsEnum(EquipmentStatus, { message: 'Status inválido. Use: available, in_use ou maintenance' })
  @IsOptional()
  status?: string;

  @ApiProperty({ 
    description: 'Custo da diária deste equipamento para orçamento', 
    example: 250.00 
  })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O custo diário deve ser um número válido' })
  @Min(0, { message: 'O custo diário não pode ser negativo' })
  @IsNotEmpty({ message: 'O custo diário é obrigatório' })
  dailyCost: number;
}