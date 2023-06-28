import {
  MongooseModule,
  Prop,
  raw,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ConversationDocument = HydratedDocument<ConversationModel>;

@Schema()
export class ConversationModel {
  @Prop()
  lessonId: string;

  @Prop()
  title: string;

  @Prop()
  audioFile: string;

  @Prop()
  image: string;

  @Prop([
    raw({
      character: {
        type: String,
      },
      converse: {
        type: String,
      },
      mean: {
        type: String,
      },
    }),
  ])
  converses: Record<any, any>[];
}

export const ConversationSchema =
  SchemaFactory.createForClass(ConversationModel);
export const ConversationTableName = 'conversations';
export const ConversationSchemaModule = MongooseModule.forFeature([
  {
    name: ConversationModel.name,
    schema: ConversationSchema,
    collection: ConversationTableName,
  },
]);
