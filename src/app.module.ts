import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule} from '@nestjs/serve-static';
import { join } from "path";

import { DatabaseModule } from './database/database.module';
import { FormUsuarioModule } from './form_usuario/form_usuario.module';


@Module({

    imports: [
        // Carrega as variáveis do arquivo .env
        // e disponibiliza o ConfigService globalmente
        ConfigModule.forRoot({
            isGlobal: true,
        }),

        ServeStaticModule.forRoot({
            rootPath:join(__dirname,'..','public'),
        }),
        DatabaseModule,
        FormUsuarioModule,
    ],

})
export class AppModule {}