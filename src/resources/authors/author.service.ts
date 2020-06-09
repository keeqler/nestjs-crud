import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { RepositoryService } from '~/repository/repository.service';

import { Author } from '~/database/entities/author.entity';

import { CreateAuthorBodyDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  authorRepository: Repository<Author>;

  constructor(private readonly repositoryService: RepositoryService) {
    this.authorRepository = this.repositoryService.authorRepository;
  }

  async createAuthor(body: CreateAuthorBodyDto): Promise<Author> {
    const author = this.authorRepository.create(body);

    console.log(author);

    return await this.authorRepository.save(author);
  }
}
