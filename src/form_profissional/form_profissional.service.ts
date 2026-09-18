import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';

import {
  ResultSetHeader,
  RowDataPacket
} from 'mysql2';

import { DatabaseService } from 'src/database/database.service';

import { CreateFormProfissionalDto } from './dto/create-form_profissional.dto';
import { UpdateFormProfissionalDto } from './dto/update-form_profissional.dto';


@Injectable()
export class FormProfissionalService {

  constructor(
    private readonly databaseService: DatabaseService
  ) {}


  // ==========================================
  // CADASTRAR PROFISSIONAL
  // ==========================================

  async criar(
    createFormProfissionalDto: CreateFormProfissionalDto
  ) {

    const {
      nome,
      sobrenome,
      cpf,
      telefone,
      email,
      especialidade_id,
      modalidades,
      registro_profissional,
      cidade,
      estado,
      valor_consulta,
      descricao
    } = createFormProfissionalDto;


    // ==========================================
    // VERIFICAR CPF
    // ==========================================

    const cpfExistente = await this.databaseService.query(
      'SELECT id FROM cadastro_profissional WHERE cpf = ?',
      [cpf]
    ) as RowDataPacket[];

    if (cpfExistente.length > 0) {
      throw new ConflictException(
        'CPF já cadastrado'
      );
    }


    // ==========================================
    // VERIFICAR E-MAIL
    // ==========================================

    const emailExistente = await this.databaseService.query(
      'SELECT id FROM cadastro_profissional WHERE email = ?',
      [email]
    ) as RowDataPacket[];

    if (emailExistente.length > 0) {
      throw new ConflictException(
        'E-mail já cadastrado'
      );
    }


    // ==========================================
    // VERIFICAR ESPECIALIDADE
    // ==========================================

    const especialidade = await this.databaseService.query(
      'SELECT id FROM especialidade WHERE id = ?',
      [especialidade_id]
    ) as RowDataPacket[];

    if (especialidade.length === 0) {
      throw new NotFoundException(
        'Especialidade não encontrada'
      );
    }


    // ==========================================
    // VERIFICAR MODALIDADES
    // ==========================================

    for (const modalidadeId of modalidades) {

      const modalidade = await this.databaseService.query(
        'SELECT id FROM modalidade WHERE id = ?',
        [modalidadeId]
      ) as RowDataPacket[];

      if (modalidade.length === 0) {
        throw new NotFoundException(
          `Modalidade ${modalidadeId} não encontrada`
        );
      }
    }


    // ==========================================
    // CADASTRAR PROFISSIONAL
    // ==========================================

    const sql = `
      INSERT INTO cadastro_profissional (
        nome,
        sobrenome,
        cpf,
        telefone,
        email,
        especialidade_id,
        registro_profissional,
        cidade,
        estado,
        valor_consulta,
        descricao
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const resultado = await this.databaseService.query(
      sql,
      [
        nome,
        sobrenome,
        cpf,
        telefone,
        email,
        especialidade_id,
        registro_profissional,
        cidade,
        estado,
        valor_consulta ?? null,
        descricao ?? null
      ]
    ) as ResultSetHeader;


    const profissionalId = resultado.insertId;


    // ==========================================
    // CADASTRAR MODALIDADES DO PROFISSIONAL
    // ==========================================

    for (const modalidadeId of modalidades) {

      await this.databaseService.query(
        `
          INSERT INTO profissional_modalidade (
            profissional_id,
            modalidade_id
          )
          VALUES (?, ?)
        `,
        [
          profissionalId,
          modalidadeId
        ]
      );
    }


    return {
      mensagem: 'Profissional cadastrado com sucesso',

      profissional: {
        id: profissionalId,
        nome,
        sobrenome,
        cpf,
        telefone,
        email,
        especialidade_id,
        modalidades,
        registro_profissional,
        cidade,
        estado,
        valor_consulta,
        descricao
      }
    };
  }


  // ==========================================
  // LISTAR TODOS
  // ==========================================

  async listarProfissionais() {

    const resultado = await this.databaseService.query(
      `
        SELECT
          cp.id,
          cp.nome,
          cp.sobrenome,
          cp.cpf,
          cp.telefone,
          cp.email,

          cp.especialidade_id,
          e.nome AS especialidade,

          cp.registro_profissional,
          cp.cidade,
          cp.estado,
          cp.valor_consulta,
          cp.descricao,
          cp.data_cadastro,

          GROUP_CONCAT(
            DISTINCT m.nome
            ORDER BY m.nome
            SEPARATOR ', '
          ) AS modalidades

        FROM cadastro_profissional cp

        INNER JOIN especialidade e
          ON cp.especialidade_id = e.id

        LEFT JOIN profissional_modalidade pm
          ON cp.id = pm.profissional_id

        LEFT JOIN modalidade m
          ON pm.modalidade_id = m.id

        GROUP BY
          cp.id,
          cp.nome,
          cp.sobrenome,
          cp.cpf,
          cp.telefone,
          cp.email,
          cp.especialidade_id,
          e.nome,
          cp.registro_profissional,
          cp.cidade,
          cp.estado,
          cp.valor_consulta,
          cp.descricao,
          cp.data_cadastro

        ORDER BY cp.id DESC
      `
    );

    return resultado;
  }


  // ==========================================
  // BUSCAR PELO ID
  // ==========================================

  async buscaPorId(id: number) {

    const resultado = await this.databaseService.query(
      `
        SELECT
          cp.id,
          cp.nome,
          cp.sobrenome,
          cp.cpf,
          cp.telefone,
          cp.email,

          cp.especialidade_id,
          e.nome AS especialidade,

          cp.registro_profissional,
          cp.cidade,
          cp.estado,
          cp.valor_consulta,
          cp.descricao,
          cp.data_cadastro,

          GROUP_CONCAT(
            DISTINCT m.nome
            ORDER BY m.nome
            SEPARATOR ', '
          ) AS modalidades

        FROM cadastro_profissional cp

        INNER JOIN especialidade e
          ON cp.especialidade_id = e.id

        LEFT JOIN profissional_modalidade pm
          ON cp.id = pm.profissional_id

        LEFT JOIN modalidade m
          ON pm.modalidade_id = m.id

        WHERE cp.id = ?

        GROUP BY
          cp.id,
          cp.nome,
          cp.sobrenome,
          cp.cpf,
          cp.telefone,
          cp.email,
          cp.especialidade_id,
          e.nome,
          cp.registro_profissional,
          cp.cidade,
          cp.estado,
          cp.valor_consulta,
          cp.descricao,
          cp.data_cadastro
      `,
      [id]
    ) as RowDataPacket[];


    if (resultado.length === 0) {

      throw new NotFoundException(
        'Profissional não encontrado'
      );
    }


    return resultado[0];
  }


  // ==========================================
  // ATUALIZAR PROFISSIONAL
  // ==========================================

  async atualizar(
    id: number,
    dados: UpdateFormProfissionalDto
  ) {

    // Verifica se existe
    const profissionalAtual =
      await this.buscaPorId(id);


    // ==========================================
    // VERIFICAR CPF
    // ==========================================

    if (dados.cpf) {

      const cpfExistente =
        await this.databaseService.query(
          `
            SELECT id
            FROM cadastro_profissional
            WHERE cpf = ?
            AND id <> ?
          `,
          [dados.cpf, id]
        ) as RowDataPacket[];


      if (cpfExistente.length > 0) {

        throw new ConflictException(
          'CPF já cadastrado por outro profissional'
        );
      }
    }


    // ==========================================
    // VERIFICAR E-MAIL
    // ==========================================

    if (dados.email) {

      const emailExistente =
        await this.databaseService.query(
          `
            SELECT id
            FROM cadastro_profissional
            WHERE email = ?
            AND id <> ?
          `,
          [dados.email, id]
        ) as RowDataPacket[];


      if (emailExistente.length > 0) {

        throw new ConflictException(
          'E-mail já cadastrado por outro profissional'
        );
      }
    }


    // ==========================================
    // VERIFICAR ESPECIALIDADE
    // ==========================================

    if (dados.especialidade_id) {

      const especialidade =
        await this.databaseService.query(
          'SELECT id FROM especialidade WHERE id = ?',
          [dados.especialidade_id]
        ) as RowDataPacket[];


      if (especialidade.length === 0) {

        throw new NotFoundException(
          'Especialidade não encontrada'
        );
      }
    }


    // ==========================================
    // VERIFICAR MODALIDADES
    // ==========================================

    if (dados.modalidades) {

      for (const modalidadeId of dados.modalidades) {

        const modalidade =
          await this.databaseService.query(
            'SELECT id FROM modalidade WHERE id = ?',
            [modalidadeId]
          ) as RowDataPacket[];


        if (modalidade.length === 0) {

          throw new NotFoundException(
            `Modalidade ${modalidadeId} não encontrada`
          );
        }
      }
    }


    // ==========================================
    // ATUALIZAR DADOS PRINCIPAIS
    // ==========================================

    await this.databaseService.query(
      `
        UPDATE cadastro_profissional
        SET
          nome = ?,
          sobrenome = ?,
          cpf = ?,
          telefone = ?,
          email = ?,
          especialidade_id = ?,
          registro_profissional = ?,
          cidade = ?,
          estado = ?,
          valor_consulta = ?,
          descricao = ?
        WHERE id = ?
      `,
      [
        dados.nome ?? profissionalAtual.nome,
        dados.sobrenome ?? profissionalAtual.sobrenome,
        dados.cpf ?? profissionalAtual.cpf,
        dados.telefone ?? profissionalAtual.telefone,
        dados.email ?? profissionalAtual.email,
        dados.especialidade_id ?? profissionalAtual.especialidade_id,
        dados.registro_profissional ??
          profissionalAtual.registro_profissional,
        dados.cidade ?? profissionalAtual.cidade,
        dados.estado ?? profissionalAtual.estado,
        dados.valor_consulta ?? profissionalAtual.valor_consulta,
        dados.descricao ?? profissionalAtual.descricao,
        id
      ]
    );


    // ==========================================
    // ATUALIZAR MODALIDADES
    // ==========================================

    if (dados.modalidades) {

      // Remove as modalidades antigas
      await this.databaseService.query(
        `
          DELETE FROM profissional_modalidade
          WHERE profissional_id = ?
        `,
        [id]
      );


      // Cadastra as novas
      for (const modalidadeId of dados.modalidades) {

        await this.databaseService.query(
          `
            INSERT INTO profissional_modalidade (
              profissional_id,
              modalidade_id
            )
            VALUES (?, ?)
          `,
          [
            id,
            modalidadeId
          ]
        );
      }
    }


    return {
      mensagem: 'Profissional atualizado com sucesso'
    };
  }


  // ==========================================
  // EXCLUIR PROFISSIONAL
  // ==========================================

  async remover(id: number) {

    // Verifica se existe
    await this.buscaPorId(id);


    // A tabela profissional_modalidade
    // possui ON DELETE CASCADE.
    // Portanto, os relacionamentos serão
    // removidos automaticamente.

    await this.databaseService.query(
      `
        DELETE FROM cadastro_profissional
        WHERE id = ?
      `,
      [id]
    );


    return {
      mensagem: 'Profissional excluído com sucesso'
    };
  }
}