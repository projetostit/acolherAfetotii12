import { Controller, Body, Post, Get, Put, Delete, ParseIntPipe, Param} from '@nestjs/common';
import { CreateFormularioUsuarioDto } from './dto/create-form_usuario.dto';
import { UpdateFormularioUsuarioDto } from './dto/update-form_usuario.dto';
import { FormUsuarioService } from './form_usuario.service';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';


@ApiTags('Formulário Usuário')
@Controller('form-usuario')
export class FormUsuarioController {

    // Injetamos o FormUsuarioService
    // para o controller conseguir acessar os métodos do service
    constructor( private readonly formUsuarioService: FormUsuarioService) {}

    // Define o endpoint POST /form-usuario
    @Post()
    @ApiOperation({
        summary: 'Cadastrar um novo formulário de usuário'
    })

    @ApiResponse({
        status: 201,
        description: 'Formulário enviado com sucesso'
    })
    @ApiResponse({
        status: 400,
        description: 'Dados para o envio'
    })

    criar(
        @Body() createFormularioUsuarioDto: CreateFormularioUsuarioDto
    ) {
        // O @Body captura os dados enviados no corpo da requisição
        // O DTO define como esses dados deverão ser validados.

        return this.formUsuarioService.criar(createFormularioUsuarioDto);
    }

    // Define o endpoint GET /form-usuario
    @Get()
    @ApiOperation({
        summary: 'Retornar todos os formulários de usuários'
    })

    @ApiResponse({
        status: 200,
        description: 'Lista de formulários retornada com sucesso'
    })
    @ApiResponse({
        status: 404,
        description: 'Não foi possível retornar a lista de formulários'
    })

    listarTodos() {
        return this.formUsuarioService.listarUsuarios();
    };


    // Define o endpoint GET /form-usuario/:id
    @Get(':id')
    @ApiOperation({
        summary: 'Localizar formulário pelo ID'
    })

    @ApiResponse({
        status: 200,
        description: 'Formulário encontrado com sucesso'
    })

    @ApiResponse({
        status: 404,
        description: 'Formulário não cadastrado'
    })

    buscaPorId(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.formUsuarioService.buscaPorId(id);
    }

    // Define o endpoint PUT /form-usuario/:id
    @Put(':id')
    @ApiOperation({
        summary: 'Atualizar formulário pelo ID'
    })

    @ApiResponse({
        status: 200,
        description: 'Formulário atualizado com sucesso'
    })

    @ApiResponse({
        status: 400,
        description: 'Dados inválidos para atualização'
    })

    @ApiResponse({
        status: 404,
        description: 'Formulário não encontrado'
    })

    atualizar(
        @Param('id', ParseIntPipe) id: number,
        @Body() dados: UpdateFormularioUsuarioDto) {
        return this.formUsuarioService.atualizar(id, dados);
    }

    // Define o endpoint DELETE /form-usuario/:id
    @Delete(':id')
    @ApiOperation({
        summary: 'Remover formulário pelo ID'
    })

    @ApiResponse({
        status: 200,
        description: 'Formulário removido com sucesso'
    })

    @ApiResponse({
        status: 404,
        description: 'Formulário não encontrado'
    })

    remover(
        @Param('id', ParseIntPipe) id: number) {
        return this.formUsuarioService.remover(id);
    }
}