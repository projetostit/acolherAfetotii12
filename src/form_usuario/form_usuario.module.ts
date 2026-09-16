import { Module } from '@nestjs/common';
import { FormUsuarioController } from './form_usuario.controller';
import { FormUsuarioService } from './form_usuario.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  // Importamos o DatabaseService porque o livrosService precisará acessar o banco.
  imports: [DatabaseModule],
  controllers: [FormUsuarioController],
  providers: [FormUsuarioService]
})
export class FormUsuarioModule {}
