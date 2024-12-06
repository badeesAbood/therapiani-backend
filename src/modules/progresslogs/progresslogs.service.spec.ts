import { Test, TestingModule } from '@nestjs/testing';
import { ProgresslogsService } from './progresslogs.service';

describe('ProgresslogsService', () => {
  let service: ProgresslogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgresslogsService],
    }).compile();

    service = module.get<ProgresslogsService>(ProgresslogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
