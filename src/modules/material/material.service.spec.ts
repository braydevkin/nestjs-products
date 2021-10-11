import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getMongooseTestModule } from 'src/database/mock/db.mock';
import { MaterialMongooseModule } from './infrastructure/material.mongoose.module';
import { MaterialService } from './material.service';
import MaterialMock from './mock';

describe('MaterialService', () => {
  let service: MaterialService;

  const mockService = {
    create: jest.fn(),
    readOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [getMongooseTestModule(), MaterialMongooseModule],
      providers: [
        MaterialService,
        {
          provide: getModelToken('Material'),
          useValue: mockService,
        },
      ],
    }).compile();

    service = module.get<MaterialService>(MaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('readAllMaterials', () => {
    it('Should return a list of materials', async () => {
      const material = MaterialMock.giveMeAllMaterials();
      mockService.find.mockReturnValue([material]);

      const materials = await service.readAll(material);

      expect(mockService.find).toHaveBeenCalledTimes(1);
      expect(materials.length).toBe(1);
    });

    it('Should validate inputs', async () => {
      const material = MaterialMock.giveMeAllMaterials();
      mockService.find.mockReturnValue([material]);

      expect(material.name).toEqual('Verde Ubatuba');
      expect(material.purchasePrice).toEqual(300);
      expect(material.sellPrice).toEqual(450);
      expect(material.shopID).toEqual('1');
      expect(material.inStock).toEqual(5);
      expect(material.onSale).toEqual(true);
      expect(material.unitOfMeasurement).toEqual('m²');
    });
  });
});
