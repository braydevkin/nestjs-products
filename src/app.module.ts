import { Module } from '@nestjs/common';

import { MongooseModule } from './database/mongoose.module';
import { SeedsModule } from './database/seeds/seeds.module';

import Modules from './modules/modules';

@Module({
  imports: [MongooseModule, SeedsModule, ...Modules],
  controllers: [],
  providers: [],
})
export class AppModule {}
