"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormProfissionalModule = void 0;
const common_1 = require("@nestjs/common");
const form_profissional_controller_1 = require("./form_profissional.controller");
const form_profissional_service_1 = require("./form_profissional.service");
const database_module_1 = require("../database/database.module");
let FormProfissionalModule = class FormProfissionalModule {
};
exports.FormProfissionalModule = FormProfissionalModule;
exports.FormProfissionalModule = FormProfissionalModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [form_profissional_controller_1.FormProfissionalController],
        providers: [form_profissional_service_1.FormProfissionalService]
    })
], FormProfissionalModule);
//# sourceMappingURL=form_profissional.module.js.map