import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConversationDto } from 'src/modules/conversation/dto/create-conversation.dto';
import { UpdateConversationDto } from 'src/modules/conversation/dto/update-conversation.dto';
import { ConversationModel } from '../schemas/conversation.schema';

@Injectable()
export class ConversationRepository {
  constructor(
    @InjectModel(ConversationModel.name)
    private conversationModel: Model<ConversationModel>,
  ) {}

  findAll(query?: { lessonId: string } | any) {
    return this.conversationModel.find(query);
  }

  create(data: CreateConversationDto) {
    return this.conversationModel.create(data);
  }

  update(id: string, data: UpdateConversationDto) {
    return this.conversationModel.findByIdAndUpdate(id, data);
  }

  remove(id: string) {
    return this.conversationModel.findByIdAndDelete(id);
  }

  bulkCreate(listCreate) {
    return this.conversationModel.insertMany(listCreate);
  }

  bulkDelete(lessonId) {
    return this.conversationModel.deleteMany({
      lessonId: lessonId.toString(),
    });
  }
}
