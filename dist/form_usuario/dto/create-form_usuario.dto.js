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
exports.CreateFormularioUsuarioDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateFormularioUsuarioDto {
    nome;
    email;
    telefone;
    mensagem;
}
exports.CreateFormularioUsuarioDto = CreateFormularioUsuarioDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    (0, swagger_1.ApiProperty)({
        example: 'João da Silva',
        description: 'Nome do usuário'
    }),
    __metadata("design:type", String)
], CreateFormularioUsuarioDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(150),
    (0, swagger_1.ApiProperty)({
        example: 'joao@email.com',
        description: 'E-mail do usuário'
    }),
    __metadata("design:type", String)
], CreateFormularioUsuarioDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(20),
    (0, swagger_1.ApiProperty)({
        example: '(11) 99999-9999',
        description: 'Telefone do usuário'
    }),
    __metadata("design:type", String)
], CreateFormularioUsuarioDto.prototype, "telefone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(500),
    (0, swagger_1.ApiProperty)({
        example: 'Gostaria de saber mais informações sobre os serviços.',
        description: 'Mensagem enviada pelo usuário'
    }),
    __metadata("design:type", String)
], CreateFormularioUsuarioDto.prototype, "mensagem", void 0);
//# sourceMappingURL=create-form_usuario.dto.js.map