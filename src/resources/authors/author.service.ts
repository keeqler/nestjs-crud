import { Injectable } from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';

import { RepositoryService } from '~/repository/repository.service';

import { Author } from '~/database/entities/author.entity';

@Injectable()
export class AuthorService {
  authorRepository: Repository<Author>;

  constructor(private readonly repositoryService: RepositoryService) {
    this.authorRepository = this.repositoryService.authorRepository;
  }

  async createAuthor(data: DeepPartial<Author>): Promise<Author> {
    const author = this.authorRepository.create(data);

    return await this.authorRepository.save(author);
  }

  async findOneAuthor(where: DeepPartial<Author>): Promise<Author> {
    return await this.authorRepository.findOne({ where });
  }
}
