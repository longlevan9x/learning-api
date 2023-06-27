import {
  MongooseModule,
  Prop,
  raw,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GrammarDocument = HydratedDocument<GrammarModel>;

@Schema()
export class GrammarModel {
  @Prop()
  title: string;

  @Prop()
  lessonId: string;

  @Prop()
  structure: string;

  @Prop()
  explain: string;

  @Prop()
  mean: string;

  @Prop([
    raw({
      wordRaw: { type: String },
      wordTranslate: { type: String },
    }),
  ])
  examples: Record<any, any>[];

  @Prop()
  cloneUrl: string;
}

export const GrammarSchema = SchemaFactory.createForClass(GrammarModel);
export const GrammarTableName = 'grammars';
export const GrammarSchemaModule = MongooseModule.forFeature([
  {
    name: GrammarModel.name,
    schema: GrammarSchema,
    collection: GrammarTableName,
  },
]);
