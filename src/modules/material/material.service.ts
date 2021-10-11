import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Material, MaterialDocument } from 'src/database/models/Material';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectModel(Material.name)
    private materialModel: Model<MaterialDocument>,
  ) {}
  async create(createMaterialDto: CreateMaterialDto) {
    return this.create(createMaterialDto);
  }

  async createMany(data: Material[]): Promise<MaterialDocument[]> {
    return this.materialModel.create(data);
  }

  async readAll(filters: Partial<Material>) {
    return this.materialModel.find(filters);
  }

  readOne(id: number) {
    return `This action returns a #${id} material`;
  }

  update(id: number, updateMaterialDto: UpdateMaterialDto) {
    return `This action updates a #${id} material`;
  }

  delete(id: number) {
    return `This action removes a #${id} material`;
  }
}
