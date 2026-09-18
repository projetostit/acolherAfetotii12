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
exports.FormProfissionalController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_form_profissional_dto_1 = require("./dto/create-form_profissional.dto");
const update_form_profissional_dto_1 = require("./dto/update-form_profissional.dto");
const form_profissional_service_1 = require("./form_profissional.service");
let FormProfissionalController = class FormProfissionalController {
    formProfissionalService;
    constructor(formProfissionalService) {
        this.formProfissionalService = formProfissionalService;
    }
    criar(dados) {
        return this.formProfissionalService.criar(dados);
    }
    listarTodos() {
        return this.formProfissionalService.listarProfissionais();
    }
    buscaPorId(id) {
        return this.formProfissionalService.buscaPorId(id);
    }
    atualizar(id, dados) {
        return this.formProfissionalService.atualizar(id, dados);
    }
    remover(id) {
        return this.formProfissionalService.remover(id);
    }
};
exports.FormProfissionalController = FormProfissionalController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Cadastrar um novo profissional'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Profissional cadastrado com sucesso'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dados inválidos'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Especialidade ou modalidade não encontrada'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'CPF ou e-mail já cadastrado'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_form_profissional_dto_1.CreateFormProfissionalDto]),
    __metadata("design:returntype", void 0)
], FormProfissionalController.prototype, "criar", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar todos os profissionais'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FormProfissionalController.prototype, "listarTodos", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Buscar profissional pelo ID'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FormProfissionalController.prototype, "buscaPorId", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar profissional pelo ID'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_form_profissional_dto_1.UpdateFormProfissionalDto]),
    __metadata("design:returntype", void 0)
], FormProfissionalController.prototype, "atualizar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Excluir profissional pelo ID'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FormProfissionalController.prototype, "remover", null);
exports.FormProfissionalController = FormProfissionalController = __decorate([
    (0, swagger_1.ApiTags)('Formulário Profissional'),
    (0, common_1.Controller)('form-profissional'),
    __metadata("design:paramtypes", [form_profissional_service_1.FormProfissionalService])
], FormProfissionalController);
//# sourceMappingURL=form_profissional.controller.js.map