import { Command } from 'nestjs-command';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

import * as faker from 'faker';
import { Material } from '../models/Material';
import { MaterialService } from 'src/modules/material/material.service';

@Injectable()
export class SeedsService {
  constructor(
    @Inject(forwardRef(() => MaterialService))
    private materialService: MaterialService,
  ) {}
  @Command({
    command: 'create:seeds',
    describe: 'create all seeds',
  })
  async createMaterialSeeds() {
    const materials: Material[] = [...new Array(200)].map(() => {
      return {
        name: faker.commerce.productName(),
        purchasePrice: Number(faker.commerce.price()),
        sellPrice: Number(faker.commerce.price()),
        unitOfMeasurement: 'm²',
        onSale: true,
        inStock: 10,
        shopID: String(faker.random),
      };
    });
    await this.materialService.createMany(materials).then(created => {
      console.log(`${created.length} successfully created products`);
    });
  }
}
