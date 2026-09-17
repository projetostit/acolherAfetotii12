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
exports.FormUsuarioService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let FormUsuarioService = class FormUsuarioService {
    databasService;
    constructor(databasService) {
        this.databasService = databasService;
    }
    async criar(createFormularioUsuarioDto) {
        const { nome, email, telefone, mensagem } = createFormularioUsuarioDto;
        const sql = `
            INSERT INTO formulario_usuario (
                nome, email, telefone, mensagem
            )
                VALUES (?, ?, ?, ?)
        `;
        const resultado = await this.databasService.query(sql, [
            nome, email, telefone, mensagem
        ]);
        return {
            mensagem: 'Usuario cadastrado com sucesso',
            livro: {
                id: resultado.insertId,
                nome,
                email,
                telefone,
                mensagem
            }
        };
    }
    async listarUsuarios() {
        const resultado = await this.databasService.query('SELECT * FROM formulario_usuario');
        return resultado;
    }
    async buscaPorId(id) {
        const resultado = await this.databasService.query('SELECT * FROM formulario_usuario WHERE id = ?', [id]);
        if (resultado.length === 0) {
            throw new common_1.NotFoundException('Usuario não encontrado');
        }
        return resultado[0];
    }
    async atualizar(id, dados) {
        await this.buscaPorId(id);
        await this.databasService.query('UPDATE formulario_usuario SET nome = ?, email = ?, telefone = ?, mensagem = ? WHERE id = ?', [dados.nome, dados.email, dados.telefone, dados.mensagem, id]);
        return {
            mensagem: 'Usuario atualizado com sucesso'
        };
    }
    async remover(id) {
        await this.databasService.query('DELETE FROM formulario_usuario WHERE id = ?', [id]);
        return {
            mensagem: 'Usuario excluído com sucesso'
        };
    }
};
exports.FormUsuarioService = FormUsuarioService;
exports.FormUsuarioService = FormUsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], FormUsuarioService);
//# sourceMappingURL=form_usuario.service.js.map