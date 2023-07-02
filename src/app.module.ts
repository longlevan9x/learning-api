import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './modules/book/book.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { CategoryModule } from './modules/category/category.module';
import { RouterModule } from '@nestjs/core';
import { appRoutes } from './app.routes';
import { VocabularyModule } from './modules/vocabulary/vocabulary.module';
import { GrammarModule } from './modules/grammar/grammar.module';
import { ScraperModule } from './modules/scraper/scraper.module';
import { CheerioService } from './app/services/cheerio.service';
import { KanjiModule } from './modules/kanji/kanji.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import TypeOrmMysql from "./app/databases/typeOrm.mysql";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, { dbName: 'learning' }),
    RouterModule.register(appRoutes),
    BookModule,
    LessonModule,
    CategoryModule,
    VocabularyModule,
    GrammarModule,
    ScraperModule,
    KanjiModule,
    ConversationModule,
    TypeOrmMysql,
  ],
  controllers: [AppController],
  providers: [AppService, CheerioService],
})
export class AppModule {}
