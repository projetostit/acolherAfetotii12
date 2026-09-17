"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormUsuarioModule = void 0;
const common_1 = require("@nestjs/common");
const form_usuario_controller_1 = require("./form_usuario.controller");
const form_usuario_service_1 = require("./form_usuario.service");
const database_module_1 = require("../database/database.module");
let FormUsuarioModule = class FormUsuarioModule {
};
exports.FormUsuarioModule = FormUsuarioModule;
exports.FormUsuarioModule = FormUsuarioModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [form_usuario_controller_1.FormUsuarioController],
        providers: [form_usuario_service_1.FormUsuarioService]
    })
], FormUsuarioModule);
//# sourceMappingURL=form_usuario.module.js.map