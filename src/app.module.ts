import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { sqliteOptions } from '~/config/database';

import { AuthorModule } from './resources/authors/author.module';
import { PostModule } from './resources/posts/post.module';

@Module({
  imports: [TypeOrmModule.forRoot(sqliteOptions), AuthorModule, PostModule],
})
export class AppModule {}
