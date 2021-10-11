import { Module } from '@nestjs/common';

import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';

import { MaterialMongooseModule } from './infrastructure/material.mongoose.module';

@Module({
  imports: [MaterialMongooseModule],
  providers: [MaterialService],
  exports: [MaterialService],
})
export class MaterialModule {}
