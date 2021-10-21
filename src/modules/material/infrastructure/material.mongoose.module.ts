import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Material, MaterialSchema } from 'src/database/models/Material';
import { MaterialMongooseRepository } from './material.mongoose.repository';

const mongooseFeatures = [
  MongooseModule.forFeature([{ name: Material.name, schema: MaterialSchema }]),
];

@Module({
  imports: [...mongooseFeatures],
  exports: [...mongooseFeatures, MaterialMongooseRepository],
  providers: [MaterialMongooseRepository],
})
export class MaterialMongooseModule {}
