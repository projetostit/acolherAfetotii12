import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  Min
} from 'class-validator';

import { Type } from 'class-transformer';

import {
  ApiProperty,
  ApiPropertyOptional
} from '@nestjs/swagger';


export class CreateFormProfissionalDto {

  @ApiProperty({
    example: 'Maria',
    description: 'Nome do profissional'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nome!: string;


  @ApiProperty({
    example: 'Silva',
    description: 'Sobrenome do profissional'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  sobrenome!: string;


  @ApiProperty({
    example: '12345678901',
    description: 'CPF contendo 11 números'
  })
  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  cpf!: string;


  @ApiProperty({
    example: '11999999999',
    description: 'Telefone do profissional'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  telefone!: string;


  @ApiProperty({
    example: 'maria@email.com',
    description: 'E-mail do profissional'
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(150)
  email!: string;


  @ApiProperty({
    example: 1,
    description: 'ID da especialidade'
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  especialidade_id!: number;


  @ApiProperty({
    example: [1, 2],
    description: 'IDs das modalidades de atendimento',
    type: [Number]
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  modalidades!: number[];


  @ApiProperty({
    example: 'CRP123456',
    description: 'Registro profissional'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  registro_profissional!: string;


  @ApiProperty({
    example: 'São Paulo',
    description: 'Cidade onde o profissional atua'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  cidade!: string;


  @ApiProperty({
    example: 'SP',
    description: 'Sigla do estado'
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  estado!: string;


  @ApiPropertyOptional({
    example: 150,
    description: 'Valor da consulta'
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  valor_consulta?: number;


  @ApiPropertyOptional({
    example: 'Profissional especializado no atendimento de pessoas com TEA.',
    description: 'Descrição do profissional'
  })
  @IsOptional()
  @IsString()
  descricao?: string;
}