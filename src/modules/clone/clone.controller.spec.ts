import { Test, TestingModule } from '@nestjs/testing';
import { CloneController } from './clone.controller';
import { CloneService } from './clone.service';

describe('CloneController', () => {
  let controller: CloneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CloneController],
      providers: [CloneService],
    }).compile();

    controller = module.get<CloneController>(CloneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
