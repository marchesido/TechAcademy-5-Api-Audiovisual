import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ 
    description: 'Nome completo do cliente', 
    example: 'Lucas Henrique Junior' 
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @Length(3, 150)
  name: string;

  @ApiProperty({ 
    description: 'E-mail para login e contato', 
    example: 'lucas.henrique@gmail.com' 
  })
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string;

  @ApiProperty({ 
    description: 'Telefone de contato com DDD', 
    example: '44998887766' 
  })
  @IsString()
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  @Length(8, 20)
  phone: string;

  @ApiProperty({ 
    description: 'CPF do cliente (apenas números)', 
    example: '12345678901' 
  })
  @IsString()
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  @Length(11, 11, { message: 'O CPF deve ter exatamente 11 dígitos' })
  cpf: string;

  @ApiProperty({ 
    description: 'Nome da empresa vinculada (opcional)', 
    example: 'Produtora Audiovisual LTDA',
    required: false 
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome da empresa é obrigatório' })
  @Length(0, 150)
  company: string;
}