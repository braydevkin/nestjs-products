import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
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
  async create(createMaterialDto: CreateMaterialDto) {
    return this.materialModel.create(createMaterialDto);
  }

  async createMany(data: Material[]): Promise<Material[]> {
    return this.materialModel.create(data);
  }

  async readAll(filters: Partial<Material>): Promise<Material[]> {
    const materials = this.materialModel.find(filters);
    return materials;
  }

  async readOne(id: string): Promise<Material> {
    return this.materialModel.findOne({}, id);
  }

  async getMaterialOffStock(filters: Partial<Material>): Promise<Material[]> {
    return this.materialModel.find(filters);
  }

  async update(
    id: string,
    updateMaterialDto: UpdateMaterialDto,
  ): Promise<Material> {
    return this.materialModel.findByIdAndUpdate(id, updateMaterialDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<Material> {
    return this.materialModel.findByIdAndDelete(id);
  }
}
