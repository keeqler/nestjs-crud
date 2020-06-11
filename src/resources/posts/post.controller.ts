import { Controller, Body, Headers, Res, Post } from '@nestjs/common';
import { Response } from 'express';

import { AuthorService } from '~/resources/authors/author.service';

import { CreatePostHeadersDto, CreatePostBodyDto } from './dto/create-post.dto';

import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private authorService: AuthorService, private postService: PostService) {}

  @Post()
  async createPost(
    @Headers() headers: CreatePostHeadersDto,
    @Body() body: CreatePostBodyDto,
    @Res() response: Response
  ) {
    const authorName = headers['x-author'];
    const { title, text } = body;

    const author = await this.authorService.findAuthor({ name: authorName });

    if (!author) {
      return response.status(400).send({ error: 'unexistentAuthor' });
    }

    await this.postService.createPost({ authorId: author.id, title, text });

    return response.sendStatus(201);
  }
}
