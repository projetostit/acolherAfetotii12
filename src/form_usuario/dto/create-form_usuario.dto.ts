import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateFormularioUsuarioDto {

    @IsString() // Tem que ser string
    @IsNotEmpty() // Não pode estar vazio
    @MaxLength(100) // Máximo de 100 caracteres
    @ApiProperty({
        example: 'João da Silva',
        description: 'Nome do usuário'
    })
    nome: string;


    @IsEmail() // Tem que ser um e-mail válido
    @IsNotEmpty() // Não pode estar vazio
    @MaxLength(150) // Máximo de 150 caracteres
    @ApiProperty({
        example: 'joao@email.com',
        description: 'E-mail do usuário'
    })
    email: string;


    @IsString() // Tem que ser string
    @IsNotEmpty() // Não pode estar vazio
    @MaxLength(20) // Máximo de 20 caracteres
    @ApiProperty({
        example: '(11) 99999-9999',
        description: 'Telefone do usuário'
    })
    telefone: string;


    @IsString() // Tem que ser string
    @IsNotEmpty() // Não pode estar vazio
    @MaxLength(500) // Máximo de 500 caracteres
    @ApiProperty({
        example: 'Gostaria de saber mais informações sobre os serviços.',
        description: 'Mensagem enviada pelo usuário'
    })
    mensagem: string;
}
