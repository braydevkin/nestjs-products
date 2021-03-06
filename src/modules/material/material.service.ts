import { Model } from 'mongoose';

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

import { Material, MaterialDocument } from 'src/database/models/Material';

import { IMaterialService } from './interfaces/material.service.interface';

@Injectable()
export class MaterialService implements IMaterialService {
  constructor(
    @InjectModel(Material.name)
    private materialModel: Model<MaterialDocument>,
  ) {}
  async create(createMaterialDto: CreateMaterialDto) : Promise<Material> {
    const material = await this.materialModel.create(createMaterialDto);

    if(!material){
      throw new InternalServerErrorException('User cannot be created, try again')
    }

    return material
  }

  async createMany(data: Material[]): Promise<Material[]> {
    return this.materialModel.create(data);
  }

  async readAll(filters: Partial<Material>): Promise<Material[]> {
     return await this.materialModel.find(filters);
  }

  async readOne(id: string): Promise<Material> {
     const material = await this.materialModel.findOne({}, id);
     if(!material) {
      throw new NotFoundException('Material Not Found')
     }
     return material
  }

  async getMaterialOffStock(filters: Partial<Material>): Promise<Material[]> {
    return this.materialModel.find(filters);
  }

  async update(
    id: string,
    updateMaterialDto: UpdateMaterialDto,
  ): Promise<Material> {
    return await this.materialModel.findByIdAndUpdate(id, updateMaterialDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<boolean> {
    const materialDeleted = await  this.materialModel.findByIdAndDelete(id);

    if(materialDeleted){
      return true
  }
  return false
}
}