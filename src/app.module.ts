import { Module } from '@nestjs/common';

import { MongooseModule } from './database/mongoose.module';

import Modules from './modules/modules';

@Module({
  imports: [MongooseModule, ...Modules],
  controllers: [],
  providers: [],
})
export class AppModule {}
