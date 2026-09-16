
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPool, Pool } from 'mysql2/promise';

@Injectable()
export class DatabaseService {

    // O Pool gerencia um conjunto de conexões com o banco.
    private readonly pool: Pool;

    // O ConfigService acessa as variáveis do arquivo .env.
    constructor(
        private readonly configService: ConfigService) {
        this.pool = createPool({

            // Dados da conexão obtidos do arquivo .env
            host: this.configService.get<string>('DB_HOST'),
            // A porta vem como texto do .env, por isso usamos Number()
            port: Number(this.configService.get<string>('DB_PORT')),
            user: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
        });
    }

    // Método genérico para executar comandos SQL
    async query(sql: string, valores: any[] = []) {
        // Executa o comando SQL com os valores recebidos
        const [resultado] = await this.pool.execute(sql, valores);
        // Retorna o resultado da consulta
        return resultado;
    }
}