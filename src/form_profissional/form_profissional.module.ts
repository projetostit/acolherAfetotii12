import { Module } from '@nestjs/common';
import { FormProfissionalController } from './form_profissional.controller';
import { FormProfissionalService } from './form_profissional.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  // Importamos o DatabaseService porque o FormProfissionalService precisará acessar o banco.
  imports: [DatabaseModule],
  controllers: [FormProfissionalController],
  providers: [FormProfissionalService]
})
export class FormProfissionalModule {}
