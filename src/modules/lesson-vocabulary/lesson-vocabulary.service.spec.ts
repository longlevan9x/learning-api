import { Test, TestingModule } from '@nestjs/testing';
import { LessonVocabularyService } from './lesson-vocabulary.service';

describe('LessonVocabularyService', () => {
  let service: LessonVocabularyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonVocabularyService],
    }).compile();

    service = module.get<LessonVocabularyService>(LessonVocabularyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
