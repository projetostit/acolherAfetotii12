import { IsOptional, IsString, IsEmail, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFormularioUsuarioDto {

    @IsString()
    @IsOptional()
    @MaxLength(100)
    @ApiPropertyOptional({
        example: 'João da Silva',
        description: 'Novo nome do usuário',
        maxLength: 100,
    })
    nome?: string;

    @IsEmail()
    @IsOptional()
    @MaxLength(150)
    @ApiPropertyOptional({
        example: 'joao@email.com',
        description: 'Novo e-mail do usuário',
        maxLength: 150,
    })
    email?: string;

    @IsString()
    @IsOptional()
    @MaxLength(20)
    @ApiPropertyOptional({
        example: '(11) 99999-9999',
        description: 'Novo telefone do usuário',
        maxLength: 20,
    })
    telefone?: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    @ApiPropertyOptional({
        example: 'Gostaria de saber mais informações sobre os serviços.',
        description: 'Nova mensagem do usuário',
        maxLength: 500,
    })
    mensagem?: string;
}