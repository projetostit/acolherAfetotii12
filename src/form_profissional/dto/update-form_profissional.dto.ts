import { PartialType } from '@nestjs/swagger';

import { CreateFormProfissionalDto } from './create-form_profissional.dto';

export class UpdateFormProfissionalDto extends PartialType(
  CreateFormProfissionalDto
) {}