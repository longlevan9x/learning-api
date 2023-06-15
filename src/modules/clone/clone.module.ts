import { Module } from '@nestjs/common';
import { CloneService } from './clone.service';
import { CloneController } from './clone.controller';

@Module({
  controllers: [CloneController],
  providers: [CloneService],
  imports: [],
})
export class CloneModule {}
