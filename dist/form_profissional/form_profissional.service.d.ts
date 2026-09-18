import { RowDataPacket } from 'mysql2';
import { DatabaseService } from "../database/database.service";
import { CreateFormProfissionalDto } from './dto/create-form_profissional.dto';
import { UpdateFormProfissionalDto } from './dto/update-form_profissional.dto';
export declare class FormProfissionalService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    criar(createFormProfissionalDto: CreateFormProfissionalDto): Promise<{
        mensagem: string;
        profissional: {
            id: number;
            nome: string;
            sobrenome: string;
            cpf: string;
            telefone: string;
            email: string;
            especialidade_id: number;
            modalidades: number[];
            registro_profissional: string;
            cidade: string;
            estado: string;
            valor_consulta: number | undefined;
            descricao: string | undefined;
        };
    }>;
    listarProfissionais(): Promise<import("mysql2").QueryResult>;
    buscaPorId(id: number): Promise<RowDataPacket>;
    atualizar(id: number, dados: UpdateFormProfissionalDto): Promise<{
        mensagem: string;
    }>;
    remover(id: number): Promise<{
        mensagem: string;
    }>;
}
