import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { RepositoryService } from '~/repository/repository.service';

import { Post } from '~/database/entities/post.entity';

import { CreatePostData } from './post.interface';

@Injectable()
export class PostService {
  private readonly postRepository: Repository<Post>;

  constructor(private readonly repositoryService: RepositoryService) {
    this.postRepository = this.repositoryService.postRepository;
  }

  public async createPost(data: CreatePostData): Promise<Post> {
    const post = this.postRepository.create(data);

    return await this.postRepository.save(post);
  }
}
