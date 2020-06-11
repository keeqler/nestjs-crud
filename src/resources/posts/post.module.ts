import { Module } from '@nestjs/common';

import { DatabaseModule } from '~/repository/repository.module';

import { AuthorService } from '~/resources/authors/author.service';

import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [PostService, AuthorService],
})
export class PostModule {}
