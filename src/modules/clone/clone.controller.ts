import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CloneService } from './clone.service';
import { CreateCloneDto } from './dto/create-clone.dto';
import { UpdateCloneDto } from './dto/update-clone.dto';

@Controller('clone')
export class CloneController {
  constructor(private readonly cloneService: CloneService) {
  }

  @Post()
  create(@Body() createCloneDto: CreateCloneDto) {
    return this.cloneService.create(createCloneDto);
  }

  @Get()
  findAll() {
    return this.cloneService.findAll();
  }

  @Get('/clone')
  clone() {
    return this.cloneService.clone();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cloneService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCloneDto: UpdateCloneDto) {
    return this.cloneService.update(+id, updateCloneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cloneService.remove(+id);
  }
}
