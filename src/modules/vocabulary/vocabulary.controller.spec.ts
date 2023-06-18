import { Test, TestingModule } from '@nestjs/testing';
import { VocabularyController } from './vocabulary.controller';
import { VocabularyService } from './vocabulary.service';

describe('LessonVocabularyController', () => {
  let controller: VocabularyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VocabularyController],
      providers: [VocabularyService],
    }).compile();

    controller = module.get<VocabularyController>(VocabularyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
