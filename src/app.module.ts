import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { sqliteOptions } from '~/config/database';

import { AuthorModule } from './resources/authors/author.module';

@Module({
  imports: [TypeOrmModule.forRoot(sqliteOptions), AuthorModule],
})
export class AppModule {}
