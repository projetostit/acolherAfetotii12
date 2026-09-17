import { RowDataPacket } from 'mysql2';
import { DatabaseService } from "../database/database.service";
import { CreateFormularioUsuarioDto } from './dto/create-form_usuario.dto';
import { UpdateFormularioUsuarioDto } from './dto/update-form_usuario.dto';
export declare class FormUsuarioService {
    private readonly databasService;
    constructor(databasService: DatabaseService);
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
    listarUsuarios(): Promise<import("mysql2").QueryResult>;
    buscaPorId(id: number): Promise<RowDataPacket>;
    atualizar(id: number, dados: UpdateFormularioUsuarioDto): Promise<{
        mensagem: string;
    }>;
    remover(id: number): Promise<{
        mensagem: string;
    }>;
}
