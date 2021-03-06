import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    find: jest.fn(),
    findOne: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  beforeAll(async () => {
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

  beforeEach(() => {
    mockService.create.mockReset();
    mockService.find.mockReset();
    mockService.findOne.mockReset();
    mockService.findByIdAndUpdate.mockReset();
    mockService.findByIdAndDelete.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('readAllMaterials', () => {
    it('Should return a list of materials', async () => {
      const material = MaterialMock.giveMeAllMaterials();
      mockService.find.mockReturnValue(material);

      const materials = await service.readAll(material);

      expect(mockService.find).toHaveBeenCalledTimes(1);
      expect(materials).toMatchObject({ name: material.name });
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
      expect(material.unitOfMeasurement).toEqual('m??');
    });

    it('Should return exception when list is avoid', () => {
      mockService.find.mockReturnValue([]);
      const materials = service.readAll(null);

      expect(materials).rejects.toThrow(NotFoundException);
      expect(mockService.find).toHaveBeenCalledWith(null);
    });
  });

  describe('FindByIdMaterials', () => {
    it('Should return a material by id', async () => {
      const material = MaterialMock.giveMeAllMaterials();
      mockService.findOne.mockReturnValue(material);

      const materialFound = await service.readOne(material._id);

      expect(mockService.findOne).toHaveBeenCalledTimes(1);
      expect(materialFound).toMatchObject({ name: material.name });
    });

    it('Should return exception when material not found', () => {
      mockService.findOne.mockReturnValue(null);
      const material = service.readOne('3');

      expect(material).rejects.toThrow(NotFoundException);
      expect(mockService.findOne).toHaveBeenCalledWith({}, '3');
    });
  });

  describe('CreateMaterials', () => {
    it('Should create materials and return in results', async () => {
      const material = MaterialMock.giveMeAllMaterials();
      mockService.create.mockReturnValue(material);

      const materailCreated = await service.create(material);

      expect(materailCreated).toMatchObject(material);
      expect(mockService.create).toHaveBeenCalledTimes(1);
    });
    it('Should return error if material not created', async () => {
      const material = MaterialMock.giveMeAllMaterials();
      mockService.create.mockReturnValue(material);

      await service.create(material).catch((error) => {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error).toMatchObject({
          message: 'User cannot be created, try again',
        });
      });
      expect(mockService.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('UpdateMaterials', () => {
    it('Should update material', async () => {
      const material = MaterialMock.giveMeAllMaterials();
      mockService.findByIdAndUpdate.mockReturnValue({
        ...material,
        name: 'New material' ,
      });

      const updateResult = await service.update('1', {
        ...material,
        name: 'New material',
      });

      expect(updateResult).toMatchObject({name: 'New material'});
      expect(mockService.findByIdAndUpdate).toBeCalledTimes(1);
    });
  });

  describe('DeleteMaterial', ()=> {
    it('Should delete material',  async ()=> {
      const material = MaterialMock.giveMeAllMaterials();
      mockService.findByIdAndDelete.mockReturnValue(material)

      const deletedMaterial = await service.delete(material._id)
      
      expect(deletedMaterial).toBe(true)
      expect(mockService.findByIdAndDelete).toBeCalledTimes(1)
    })
  })
});
