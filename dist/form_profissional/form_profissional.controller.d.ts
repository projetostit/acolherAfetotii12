import { CreateFormProfissionalDto } from './dto/create-form_profissional.dto';
import { UpdateFormProfissionalDto } from './dto/update-form_profissional.dto';
import { FormProfissionalService } from './form_profissional.service';
export declare class FormProfissionalController {
    private readonly formProfissionalService;
    constructor(formProfissionalService: FormProfissionalService);
    criar(dados: CreateFormProfissionalDto): Promise<{
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
    listarTodos(): Promise<import("mysql2").QueryResult>;
    buscaPorId(id: number): Promise<import("mysql2").RowDataPacket>;
    atualizar(id: number, dados: UpdateFormProfissionalDto): Promise<{
        mensagem: string;
    }>;
    remover(id: number): Promise<{
        mensagem: string;
    }>;
}
