import { Module } from '@nestjs/common';

import { getMongooseTestModule } from './mock/db.mock';

import { SeedsModule } from './seeds/seeds.module';

@Module({
  imports: [getMongooseTestModule(), SeedsModule],
})
export class MongooseTestModule {}
