import { CreateFormularioUsuarioDto } from './dto/create-form_usuario.dto';
import { UpdateFormularioUsuarioDto } from './dto/update-form_usuario.dto';
import { FormUsuarioService } from './form_usuario.service';
export declare class FormUsuarioController {
    private readonly formUsuarioService;
    constructor(formUsuarioService: FormUsuarioService);
    criar(createFormularioUsuarioDto: CreateFormularioUsuarioDto): Promise<{
        mensagem: string;
        livro: {
            id: number;
            nome: string;
            email: string;
            telefone: string;
            mensagem: string;
        };
    }>;
    listarTodos(): Promise<import("mysql2").QueryResult>;
    buscaPorId(id: number): Promise<import("mysql2").RowDataPacket>;
    atualizar(id: number, dados: UpdateFormularioUsuarioDto): Promise<{
        mensagem: string;
    }>;
    remover(id: number): Promise<{
        mensagem: string;
    }>;
}
