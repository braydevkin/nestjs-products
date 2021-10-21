import { forwardRef, Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

import { MaterialModule } from 'src/modules/material/material.module';

import { SeedsService } from './seeds.service';

@Module({
  imports: [forwardRef(() => MaterialModule), CommandModule],
  providers: [SeedsService],
  exports: [SeedsService],
})
export class SeedsModule {}
