import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { IMaterial } from 'src/shared/interfaces/Material.interface';
import { Material } from 'src/database/models/Material';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('materials')
@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto) : Promise<Material> {
    return this.materialService.create(createMaterialDto);
  }

  @Get('/')
  async findAll(@Query() filters: Material) : Promise<Material[]> {
    return await this.materialService.readAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) : Promise<Material> {
    return  await this.materialService.readOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) : Promise<Material> {
    return await this.materialService.update(id, updateMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialService.delete(id);
  }
}
