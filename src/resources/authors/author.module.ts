import { Module } from '@nestjs/common';

import { DatabaseModule } from '~/repository/repository.module';

import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
