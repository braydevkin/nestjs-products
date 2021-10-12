import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsNumber, IsBoolean } from 'class-validator';
import { CreateMaterialDto } from './create-material.dto';

export class UpdateMaterialDto extends PartialType(CreateMaterialDto) {
  @ApiProperty({
    required: true,
    maxLength: 50,
  })
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  purchasePrice: number;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNumber()
  sellPrice: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  inStock?: number;

  @ApiProperty({
    type: Boolean,
    required: false,
    default: false,
  })
  @IsBoolean()
  onSale?: boolean;

  @ApiProperty({
    type: String,
    required: false,
    default: 'm²',
  })
  @IsString()
  unitOfMeasurement?: string;

  @ApiProperty({
    type: String,
    required: true,
    default: '1',
  })
  shopID: string;
}
