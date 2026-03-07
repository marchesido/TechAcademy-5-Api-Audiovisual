import { ApiProperty } from '@nestjs/swagger';
import { 
  IsDateString, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsString, 
  IsUUID, 
  Length, 
  Min 
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ 
    description: 'Título do projeto audiovisual', 
    example: 'Vídeo Institucional - Campanha de Verão 2026' 
  })
  @IsString()
  @IsNotEmpty({ message: 'O título do projeto é obrigatório' })
  @Length(3, 150)
  title: string;

  @ApiProperty({ 
    description: 'Descrição detalhada do escopo do projeto', 
    example: 'Produção de 3 vídeos de 30 segundos para redes sociais.',
    required: false 
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ 
    description: 'Orçamento total aprovado para o projeto', 
    example: 5500.00 
  })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O orçamento deve ser um número válido' })
  @Min(0)
  @IsNotEmpty({ message: 'O orçamento é obrigatório' })
  budget: number;

  @ApiProperty({ 
    description: 'Status atual do projeto', 
    example: 'pending',
    default: 'pending' 
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ 
    description: 'Data limite para entrega final', 
    example: '2026-12-20T23:59:59Z' 
  })
  @IsDateString({}, { message: 'O deadline deve ser uma data válida' })
  @IsNotEmpty({ message: 'A data de entrega é obrigatória' })
  deadline: Date;

  @ApiProperty({ 
    description: 'ID (UUID) do cliente proprietário do projeto', 
    example: '550e8400-e29b-41d4-a716-446655440000' 
  })
  @IsUUID('4', { message: 'O ID do cliente deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O vínculo com um cliente é obrigatório' })
  clientId: string;
}