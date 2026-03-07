import { ApiProperty } from '@nestjs/swagger';
import { 
  IsDateString, 
  IsInt, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsUUID, 
  Min 
} from 'class-validator';

export class CreateProjectEquipmentDto {
  @ApiProperty({ 
    description: 'ID do Projeto que receberá o equipamento', 
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' 
  })
  @IsUUID('4', { message: 'O ID do projeto deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O vínculo com um projeto é obrigatório' })
  projectId: string;

  @ApiProperty({ 
    description: 'ID do Equipamento a ser alocado', 
    example: '550e8400-e29b-41d4-a716-446655440000' 
  })
  @IsUUID('4', { message: 'O ID do equipamento deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O vínculo com um equipamento é obrigatório' })
  equipmentId: string;

  @ApiProperty({ 
    description: 'Quantidade de unidades deste equipamento', 
    example: 1, 
    default: 1 
  })
  @IsInt({ message: 'A quantidade deve ser um número inteiro' })
  @Min(1, { message: 'A quantidade mínima é 1' })
  @IsNotEmpty({ message: 'A quantidade é obrigatória' })
  quantity: number;

  @ApiProperty({ 
    description: 'Data em que o equipamento será utilizado', 
    example: '2026-03-15' 
  })
  @IsDateString({}, { message: 'A data de uso deve ser válida (AAAA-MM-DD)' })
  @IsNotEmpty({ message: 'A data de uso é obrigatória' })
  usageDate: Date;

  @ApiProperty({ 
    description: 'Preço diário customizado para este projeto (opcional)', 
    example: 180.00,
    required: false 
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  customDailyCost?: number;
}