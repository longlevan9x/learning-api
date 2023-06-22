import { PartialType } from '@nestjs/mapped-types';
import { CreateKanjiDto } from './create-kanji.dto';

export class UpdateKanjiDto extends PartialType(CreateKanjiDto) {}
