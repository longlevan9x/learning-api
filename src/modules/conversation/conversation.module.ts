import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { ConversationSchemaModule } from '../../app/schemas/conversation.schema';
import { ConversationRepository } from '../../app/repositories/conversation.repository';
import { LessonRepository } from '../../app/repositories/lesson.repository';
import { LessonSchemaModule } from '../../app/schemas/lesson.schema';
import { ScrapingServiceInterface } from '../../app/services/scraping.service';

@Module({
  controllers: [ConversationController],
  providers: [
    ConversationService,
    ConversationRepository,
    LessonRepository,
    ScrapingServiceInterface,
  ],
  imports: [ConversationSchemaModule, LessonSchemaModule],
})
export class ConversationModule {}
