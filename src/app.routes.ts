import { Routes } from '@nestjs/core';
import { BookModule } from './modules/book/book.module';
import { CategoryModule } from './modules/category/category.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { VocabularyModule } from './modules/vocabulary/vocabulary.module';
import { GrammarModule } from './modules/grammar/grammar.module';
import { KanjiModule } from './modules/kanji/kanji.module';
import { ConversationModule } from './modules/conversation/conversation.module';

export const appRoutes: Routes = [
  {
    path: 'books',
    module: BookModule,
  },
  {
    path: 'categories',
    module: CategoryModule,
  },
  {
    path: 'lessons',
    module: LessonModule,
  },
  {
    path: 'vocabularies',
    module: VocabularyModule,
  },
  {
    path: 'grammars',
    module: GrammarModule,
  },
  {
    path: 'kanjis',
    module: KanjiModule,
  },
  {
    path: 'conversations',
    module: ConversationModule,
  },
];
