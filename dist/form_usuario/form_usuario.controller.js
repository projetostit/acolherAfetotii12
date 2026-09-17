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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormUsuarioController = void 0;
const common_1 = require("@nestjs/common");
const create_form_usuario_dto_1 = require("./dto/create-form_usuario.dto");
const update_form_usuario_dto_1 = require("./dto/update-form_usuario.dto");
const form_usuario_service_1 = require("./form_usuario.service");
const swagger_1 = require("@nestjs/swagger");
let FormUsuarioController = class FormUsuarioController {
    formUsuarioService;
    constructor(formUsuarioService) {
        this.formUsuarioService = formUsuarioService;
    }
    criar(createFormularioUsuarioDto) {
        return this.formUsuarioService.criar(createFormularioUsuarioDto);
    }
    listarTodos() {
        return this.formUsuarioService.listarUsuarios();
    }
    ;
    buscaPorId(id) {
        return this.formUsuarioService.buscaPorId(id);
    }
    atualizar(id, dados) {
        return this.formUsuarioService.atualizar(id, dados);
    }
    remover(id) {
        return this.formUsuarioService.remover(id);
    }
};
exports.FormUsuarioController = FormUsuarioController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Cadastrar um novo formulário de usuário'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Formulário enviado com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dados para o envio'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_form_usuario_dto_1.CreateFormularioUsuarioDto]),
    __metadata("design:returntype", void 0)
], FormUsuarioController.prototype, "criar", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Retornar todos os formulários de usuários'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de formulários retornada com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Não foi possível retornar a lista de formulários'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FormUsuarioController.prototype, "listarTodos", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Localizar formulário pelo ID'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Formulário encontrado com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Formulário não cadastrado'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FormUsuarioController.prototype, "buscaPorId", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar formulário pelo ID'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Formulário atualizado com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dados inválidos para atualização'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Formulário não encontrado'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_form_usuario_dto_1.UpdateFormularioUsuarioDto]),
    __metadata("design:returntype", void 0)
], FormUsuarioController.prototype, "atualizar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Remover formulário pelo ID'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Formulário removido com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Formulário não encontrado'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FormUsuarioController.prototype, "remover", null);
exports.FormUsuarioController = FormUsuarioController = __decorate([
    (0, swagger_1.ApiTags)('Formulário Usuário'),
    (0, common_1.Controller)('form-usuario'),
    __metadata("design:paramtypes", [form_usuario_service_1.FormUsuarioService])
], FormUsuarioController);
//# sourceMappingURL=form_usuario.controller.js.map