import { Inject, Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { IScrapingService } from '../../app/services/scraping.service';
import { LessonRepository } from '../../app/repositories/lesson.repository';
import { ConversationRepository } from '../../app/repositories/conversation.repository';

@Injectable()
export class ConversationService {
  constructor(
    @Inject(IScrapingService)
    private readonly scrapingService: IScrapingService,
    private conversationRepository: ConversationRepository,
    private lessonRepository: LessonRepository,
  ) {}

  create(createConversationDto: CreateConversationDto) {
    return 'This action adds a new conversation';
  }

  findAll(query?: { lessonId: string }) {
    const _query: any = {};
    if (query.lessonId) {
      _query.lessonId = query.lessonId;
    }

    return this.conversationRepository.findAll(_query).limit(100);
  }

  findOne(id: number) {
    return `This action returns a #${id} conversation`;
  }

  update(id: number, updateConversationDto: UpdateConversationDto) {
    return `This action updates a #${id} conversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }

  async scraping(lessonId: string) {
    const lesson = await this.lessonRepository.findOneById(lessonId);

    if (!lesson) {
      return { message: 'fail lesson' };
    }

    let listScraping: any[] = await this.scrapingService.scrapingConversation(
      lesson.cloneUrl,
    );

    listScraping = listScraping.map((v) => {
      v.lessonId = lessonId.toString();
      return v;
    });

    await this.conversationRepository.bulkDelete(lessonId);
    await this.conversationRepository.bulkCreate(listScraping);

    return { message: 'done' };
  }
}
