import { ConfigService } from '@nestjs/config';
export declare class DatabaseService {
    private readonly configService;
    private readonly pool;
    constructor(configService: ConfigService);
    query(sql: string, valores?: any[]): Promise<import("mysql2/promise").QueryResult>;
}
