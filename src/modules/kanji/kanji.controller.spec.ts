import { Test, TestingModule } from '@nestjs/testing';
import { KanjiController } from './kanji.controller';
import { KanjiService } from './kanji.service';

describe('KanjiController', () => {
  let controller: KanjiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KanjiController],
      providers: [KanjiService],
    }).compile();

    controller = module.get<KanjiController>(KanjiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
