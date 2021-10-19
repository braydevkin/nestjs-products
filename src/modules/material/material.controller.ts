import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { MaterialService } from './material.service';

import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

import { Material } from 'src/database/models/Material';
@ApiTags('materials')
@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @ApiResponse({
    description: 'Material created successfully',
    type: Material,
  })
  @Post()
  async create(
    @Body() createMaterialDto: CreateMaterialDto,
  ): Promise<Material> {
    return await this.materialService.create(createMaterialDto);
  }

  @ApiResponse({
    description: 'Materials obtained successfully',
    type: Material,
  })
  @Get('/')
  async findAll(@Query() filters: Material): Promise<Material[]> {
    return await this.materialService.readAll(filters);
  }

  @ApiResponse({
    description: 'Material obtained',
    type: Material,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Material> {
    return await this.materialService.readOne(id);
  }

  @ApiResponse({
    description: 'Material updated successfully',
    type: Material,
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ): Promise<Material> {
    return await this.materialService.update(id, updateMaterialDto);
  }

  @ApiResponse({
    description: 'Material deleted successfully',
    type: Boolean,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.materialService.delete(id);
  }
}
