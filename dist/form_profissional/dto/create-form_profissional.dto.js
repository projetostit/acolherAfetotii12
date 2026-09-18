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
exports.CreateFormProfissionalDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class CreateFormProfissionalDto {
    nome;
    sobrenome;
    cpf;
    telefone;
    email;
    especialidade_id;
    modalidades;
    registro_profissional;
    cidade;
    estado;
    valor_consulta;
    descricao;
}
exports.CreateFormProfissionalDto = CreateFormProfissionalDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Maria',
        description: 'Nome do profissional'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateFormProfissionalDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Silva',
        description: 'Sobrenome do profissional'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateFormProfissionalDto.prototype, "sobrenome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '12345678901',
        description: 'CPF contendo 11 números'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(11, 11),
    __metadata("design:type", String)
], CreateFormProfissionalDto.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '11999999999',
        description: 'Telefone do profissional'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateFormProfissionalDto.prototype, "telefone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'maria@email.com',
        description: 'E-mail do profissional'
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], CreateFormProfissionalDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'ID da especialidade'
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateFormProfissionalDto.prototype, "especialidade_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [1, 2],
        description: 'IDs das modalidades de atendimento',
        type: [Number]
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsInt)({ each: true }),
    __metadata("design:type", Array)
], CreateFormProfissionalDto.prototype, "modalidades", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'CRP123456',
        description: 'Registro profissional'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateFormProfissionalDto.prototype, "registro_profissional", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'São Paulo',
        description: 'Cidade onde o profissional atua'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateFormProfissionalDto.prototype, "cidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'SP',
        description: 'Sigla do estado'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(2, 2),
    __metadata("design:type", String)
], CreateFormProfissionalDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 150,
        description: 'Valor da consulta'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateFormProfissionalDto.prototype, "valor_consulta", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Profissional especializado no atendimento de pessoas com TEA.',
        description: 'Descrição do profissional'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFormProfissionalDto.prototype, "descricao", void 0);
//# sourceMappingURL=create-form_profissional.dto.js.map