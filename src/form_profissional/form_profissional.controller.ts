import {
  Controller,
  Body,
  Post,
  Get,
  Put,
  Delete,
  ParseIntPipe,
  Param
} from '@nestjs/common';

import {
  ApiTags,
  ApiResponse,
  ApiOperation
} from '@nestjs/swagger';

import { CreateFormProfissionalDto } from './dto/create-form_profissional.dto';
import { UpdateFormProfissionalDto } from './dto/update-form_profissional.dto';
import { FormProfissionalService } from './form_profissional.service';


@ApiTags('Formulário Profissional')
@Controller('form-profissional')
export class FormProfissionalController {

  constructor(
    private readonly formProfissionalService: FormProfissionalService
  ) {}


  @Post()
  @ApiOperation({
    summary: 'Cadastrar um novo profissional'
  })
  @ApiResponse({
    status: 201,
    description: 'Profissional cadastrado com sucesso'
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos'
  })
  @ApiResponse({
    status: 404,
    description: 'Especialidade ou modalidade não encontrada'
  })
  @ApiResponse({
    status: 409,
    description: 'CPF ou e-mail já cadastrado'
  })
  criar(
    @Body() dados: CreateFormProfissionalDto
  ) {
    return this.formProfissionalService.criar(dados);
  }


  @Get()
  @ApiOperation({
    summary: 'Listar todos os profissionais'
  })
  listarTodos() {
    return this.formProfissionalService.listarProfissionais();
  }


  @Get(':id')
  @ApiOperation({
    summary: 'Buscar profissional pelo ID'
  })
  buscaPorId(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.formProfissionalService.buscaPorId(id);
  }


  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar profissional pelo ID'
  })
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: UpdateFormProfissionalDto
  ) {
    return this.formProfissionalService.atualizar(
      id,
      dados
    );
  }


  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir profissional pelo ID'
  })
  remover(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.formProfissionalService.remover(id);
  }
}