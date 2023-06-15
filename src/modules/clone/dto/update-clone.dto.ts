import { PartialType } from '@nestjs/mapped-types';
import { CreateCloneDto } from './create-clone.dto';

export class UpdateCloneDto extends PartialType(CreateCloneDto) {}
