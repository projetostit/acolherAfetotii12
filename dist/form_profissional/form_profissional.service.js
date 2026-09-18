"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormProfissionalService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let FormProfissionalService = class FormProfissionalService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async criar(createFormProfissionalDto) {
        const { nome, sobrenome, cpf, telefone, email, especialidade_id, modalidades, registro_profissional, cidade, estado, valor_consulta, descricao } = createFormProfissionalDto;
        const cpfExistente = await this.databaseService.query('SELECT id FROM cadastro_profissional WHERE cpf = ?', [cpf]);
        if (cpfExistente.length > 0) {
            throw new common_1.ConflictException('CPF já cadastrado');
        }
        const emailExistente = await this.databaseService.query('SELECT id FROM cadastro_profissional WHERE email = ?', [email]);
        if (emailExistente.length > 0) {
            throw new common_1.ConflictException('E-mail já cadastrado');
        }
        const especialidade = await this.databaseService.query('SELECT id FROM especialidade WHERE id = ?', [especialidade_id]);
        if (especialidade.length === 0) {
            throw new common_1.NotFoundException('Especialidade não encontrada');
        }
        for (const modalidadeId of modalidades) {
            const modalidade = await this.databaseService.query('SELECT id FROM modalidade WHERE id = ?', [modalidadeId]);
            if (modalidade.length === 0) {
                throw new common_1.NotFoundException(`Modalidade ${modalidadeId} não encontrada`);
            }
        }
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
        const resultado = await this.databaseService.query(sql, [
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
        ]);
        const profissionalId = resultado.insertId;
        for (const modalidadeId of modalidades) {
            await this.databaseService.query(`
          INSERT INTO profissional_modalidade (
            profissional_id,
            modalidade_id
          )
          VALUES (?, ?)
        `, [
                profissionalId,
                modalidadeId
            ]);
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
    async listarProfissionais() {
        const resultado = await this.databaseService.query(`
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
      `);
        return resultado;
    }
    async buscaPorId(id) {
        const resultado = await this.databaseService.query(`
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
      `, [id]);
        if (resultado.length === 0) {
            throw new common_1.NotFoundException('Profissional não encontrado');
        }
        return resultado[0];
    }
    async atualizar(id, dados) {
        const profissionalAtual = await this.buscaPorId(id);
        if (dados.cpf) {
            const cpfExistente = await this.databaseService.query(`
            SELECT id
            FROM cadastro_profissional
            WHERE cpf = ?
            AND id <> ?
          `, [dados.cpf, id]);
            if (cpfExistente.length > 0) {
                throw new common_1.ConflictException('CPF já cadastrado por outro profissional');
            }
        }
        if (dados.email) {
            const emailExistente = await this.databaseService.query(`
            SELECT id
            FROM cadastro_profissional
            WHERE email = ?
            AND id <> ?
          `, [dados.email, id]);
            if (emailExistente.length > 0) {
                throw new common_1.ConflictException('E-mail já cadastrado por outro profissional');
            }
        }
        if (dados.especialidade_id) {
            const especialidade = await this.databaseService.query('SELECT id FROM especialidade WHERE id = ?', [dados.especialidade_id]);
            if (especialidade.length === 0) {
                throw new common_1.NotFoundException('Especialidade não encontrada');
            }
        }
        if (dados.modalidades) {
            for (const modalidadeId of dados.modalidades) {
                const modalidade = await this.databaseService.query('SELECT id FROM modalidade WHERE id = ?', [modalidadeId]);
                if (modalidade.length === 0) {
                    throw new common_1.NotFoundException(`Modalidade ${modalidadeId} não encontrada`);
                }
            }
        }
        await this.databaseService.query(`
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
      `, [
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
        ]);
        if (dados.modalidades) {
            await this.databaseService.query(`
          DELETE FROM profissional_modalidade
          WHERE profissional_id = ?
        `, [id]);
            for (const modalidadeId of dados.modalidades) {
                await this.databaseService.query(`
            INSERT INTO profissional_modalidade (
              profissional_id,
              modalidade_id
            )
            VALUES (?, ?)
          `, [
                    id,
                    modalidadeId
                ]);
            }
        }
        return {
            mensagem: 'Profissional atualizado com sucesso'
        };
    }
    async remover(id) {
        await this.buscaPorId(id);
        await this.databaseService.query(`
        DELETE FROM cadastro_profissional
        WHERE id = ?
      `, [id]);
        return {
            mensagem: 'Profissional excluído com sucesso'
        };
    }
};
exports.FormProfissionalService = FormProfissionalService;
exports.FormProfissionalService = FormProfissionalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], FormProfissionalService);
//# sourceMappingURL=form_profissional.service.js.map