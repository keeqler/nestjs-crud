import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Author } from '~/database/entities/author.entity';

@Injectable()
export class RepositoryService {
  public constructor(
    @InjectRepository(Author) public readonly authorRepository: Repository<Author>
  ) {}
}
