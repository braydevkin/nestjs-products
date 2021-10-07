import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { IMaterial } from 'src/shared/interfaces/Material.interface';

@Schema()
export class Material implements IMaterial {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty({
    type: String,
    required: true,
    default: 'ShopID',
  })
  @Prop({
    type: String,
    required: true,
    default: 'ShopID',
  })
  shopID: string;

  @ApiProperty({
    type: String,
    required: true,
    maxLength: 50,
  })
  @Prop({
    type: String,
    required: true,
    maxLength: 50,
  })
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    default: 'm²',
  })
  @Prop({
    type: String,
    required: true,
    default: 'm²',
  })
  unitOfMeasurement: string;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @Prop({
    type: Number,
    required: true,
  })
  purchasePrice: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @Prop({
    type: Boolean,
    required: true,
  })
  sellPrice: number;

  @ApiProperty({
    type: Boolean,
    required: true,
  })
  @Prop({
    type: Number,
    required: true,
  })
  inStock?: number;

  @ApiProperty({
    type: Number,
    required: true,
    default: false,
  })
  @Prop({
    type: Number,
    required: true,
    default: false,
  })
  onSale: boolean;
}

export type MaterialDocument = Material & Document;
export const MaterialSchema = SchemaFactory.createForClass(Material);
