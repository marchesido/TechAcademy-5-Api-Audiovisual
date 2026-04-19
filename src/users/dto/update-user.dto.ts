import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// Para edição do próprio usuário, e-mail não pode ser alterado conforme a regra de negócios.
export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['email'])) {}
