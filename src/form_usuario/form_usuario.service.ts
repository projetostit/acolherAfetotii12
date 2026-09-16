import { Injectable, NotFoundException } from '@nestjs/common';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { DatabaseService } from 'src/database/database.service';
import { CreateFormularioUsuarioDto } from './dto/create-form_usuario.dto';
import { UpdateFormularioUsuarioDto } from './dto/update-form_usuario.dto';

@Injectable()
export class FormUsuarioService {

     // Injetamos o DatabaseService dentro do FormUsuarioService,
    //Assim não precisamos criar manualmente uma instância de outra classe
    constructor (private readonly databasService:DatabaseService){}

    async criar (createFormularioUsuarioDto : CreateFormularioUsuarioDto){
        // Aqui estamos desestruturando o DTO para que a gente receba os valores
        const { nome, email, telefone, mensagem } = createFormularioUsuarioDto;

        // O comando SQL que fará a inserção das informações no nossso banco de dados
        const sql = `
            INSERT INTO formulario_usuario (
                nome, email, telefone, mensagem
            )
                VALUES (?, ?, ?, ?)
        `;

         // Executa o INSERT e informa para nós o tipo esperado do resultado
        const resultado = await this.databasService.query(sql, [
            nome, email, telefone, mensagem
        ]) as ResultSetHeader;

        // Retorna uma resposta mais amigável para o usuário de confirmação
        return {
            mensagem: 'Usuario cadastrado com sucesso',
            livro: {
                // O insert contém o ID 
                id: resultado.insertId,
                nome,
                email,
                telefone,
                mensagem
            }
        };
    }

     // O objetivo dessa função será a exibição de todos os usuarios cadastrados
    async listarUsuarios() {
        // A constante resultado terá armazenado todos os usuarios cadastrados na tabela 'livro' do banco de dados.
        const resultado = await this.databasService.query(
            'SELECT * FROM formulario_usuario'
        );
        return resultado;
    }

    // Realizará a busca de um usuario através do ID gerado pelo banco de dados
    async buscaPorId(id: number){
        const resultado = await this.databasService.query(
            'SELECT * FROM formulario_usuario WHERE id = ?', [id]
        ) as RowDataPacket[];
        // O RowDataPacket[] informa ao TypeScript que o resultado da consulta será tratado como uma lista de registros retornados pelo banco de dados.
        
        // Essa condição irá verificar se a consulta não encontrar nenhum usuario.
        // Se a lista estiver vazia, o seu tamanho (length) será igual a 0
        if (resultado.length === 0) {
            // Interrompe a execução da requisição e retorna uma resposta HTTP 404 (Not Found), informando que o livro solicitado não foi encontrado.
            throw new NotFoundException(
                'Usuario não encontrado'
            )
        }

        return resultado[0];
    }

    // Essa função será responsável por realizar a atualização dos usuarios já cadastrados no banco de dados.
    async atualizar(id: number, dados: UpdateFormularioUsuarioDto){
        // Antes de realizar a atualização, buscamos o usuario pelo ID.
        // Caso o usuario não exista, o método 'buscarPorId' já lança a exceção NotFound
        await this.buscaPorId(id);

        // Executando o comando SQL de UPDATE no banco de dados
        // Os sinais de '?' representam os valores que serão enviados no array logo abaixo
        await this.databasService.query(
            'UPDATE formulario_usuario SET nome = ?, email = ?, telefone = ?, mensagem = ? WHERE id = ?',
            // Os valores são substituidos nos '?' na mesma ordem em que aparecem no
            // comando SQL. O 'id' não precisa dos dados, pois é ele quem localiza o livro que será editado.
            [dados.nome, dados.email, dados.telefone, dados.mensagem, id]
        );
        // Se a atualização foi bem sucedida, o usuário visualizará a mensagem
        return {
            mensagem: 'Usuario atualizado com sucesso'
        };
    }

    // Função responsável por deletar um usuario cadastrado no banco de dados
    async remover(id:number){
        // Antes de realizar a exclusão, buscamos o usuario pelo ID.
        // Caso não seja encontrado, a função 'buscaPorId' já exibe a exceção NotFound
        await this.databasService.query(
            // Executa o comando SQL de deleção
            'DELETE FROM formulario_usuario WHERE id = ?', [id]
        );
        // Localizado o ID, feita a exclusão do banco, o usuário visualizará a confirmação
        return {
            mensagem: 'Usuario excluído com sucesso'
        }
    }
}
