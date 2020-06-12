import { Injectable } from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';

import { RepositoryService } from '~/repository/repository.service';

import { Post } from '~/database/entities/post.entity';

@Injectable()
export class PostService {
  private readonly postRepository: Repository<Post>;

  constructor(private readonly repositoryService: RepositoryService) {
    this.postRepository = this.repositoryService.postRepository;
  }

  public async createPost(data: DeepPartial<Post>): Promise<Post> {
    const post = this.postRepository.create(data);

    return await this.postRepository.save(post);
  }

  public async findManyPosts(
    page: number,
    where?: DeepPartial<Post>
  ): Promise<{ posts: Post[]; count: number }> {
    const [posts, count] = await this.postRepository.findAndCount({
      where,
      take: 10,
      skip: (page - 1) * 10,
    });

    return { posts, count };
  }

  public async findPostById(id: number): Promise<Post> {
    return await this.postRepository.findOne(id);
  }

  public async updatePost(id: number, data: DeepPartial<Post>): Promise<void> {
    await this.postRepository.update(id, data);
  }

  public async deletePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
