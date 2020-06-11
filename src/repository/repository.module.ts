import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepositoryService } from './repository.service';

import { Author } from '~/database/entities/author.entity';
import { Post } from '~/database/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Post])],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class DatabaseModule {}
