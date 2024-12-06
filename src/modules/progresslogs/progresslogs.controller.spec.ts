import { Test, TestingModule } from '@nestjs/testing';
import { ProgresslogsController } from './progresslogs.controller';

describe('ProgresslogsController', () => {
  let controller: ProgresslogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgresslogsController],
    }).compile();

    controller = module.get<ProgresslogsController>(ProgresslogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
