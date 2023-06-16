import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonVocabularyDto } from './create-lesson-vocabulary.dto';

export class UpdateLessonVocabularyDto extends PartialType(CreateLessonVocabularyDto) {}
