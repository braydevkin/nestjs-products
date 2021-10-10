import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Material, MaterialDocument } from 'src/database/models/Material';
import { MongooseRepository } from 'src/database/mongoose.repository';
import { IMaterial } from 'src/shared/interfaces/Material.interface';
import { IMaterialRepository } from '../interfaces/material.repository.interface';

@Injectable()
export class MaterialMongooseRepository
  extends MongooseRepository<MaterialDocument>
  implements IMaterialRepository {
  constructor(
    @InjectModel(Material.name)
    mongooseModel: Model<MaterialDocument>,
  ) {
    super(mongooseModel);
  }
  async getMaterialOffStock(filters: Partial<IMaterial>): Promise<IMaterial> {
    return this.mongooseModel.find({ inStock: filters.inStock }).lean();
  }
}
