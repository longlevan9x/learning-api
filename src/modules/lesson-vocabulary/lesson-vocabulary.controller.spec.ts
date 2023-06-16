import { Test, TestingModule } from '@nestjs/testing';
import { LessonVocabularyController } from './lesson-vocabulary.controller';
import { LessonVocabularyService } from './lesson-vocabulary.service';

describe('LessonVocabularyController', () => {
  let controller: LessonVocabularyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonVocabularyController],
      providers: [LessonVocabularyService],
    }).compile();

    controller = module.get<LessonVocabularyController>(LessonVocabularyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
