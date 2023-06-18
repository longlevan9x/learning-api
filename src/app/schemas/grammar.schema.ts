import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GrammarDocument = HydratedDocument<GrammarModel>;

@Schema()
export class GrammarModel {
  @Prop()
  name: string;

  @Prop()
  bookId: string;

  @Prop()
  structure: string;

  @Prop()
  explain: string;

  @Prop()
  mean: string;

  @Prop()
  examples: string[];

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
