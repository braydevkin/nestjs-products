import { Test, TestingModule } from '@nestjs/testing';
import { getMongooseTestModule } from 'src/database/mock/db.mock';
import { SeedsModule } from 'src/database/seeds/seeds.module';
import { MaterialModule } from './material.module';
import { MaterialService } from './material.service';

describe('MaterialService', () => {
  let service: MaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [getMongooseTestModule(), SeedsModule, MaterialModule],
      providers: [MaterialService],
    }).compile();

    service = module.get<MaterialService>(MaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
