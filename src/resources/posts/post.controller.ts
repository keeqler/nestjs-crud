import {
  Controller,
  Body,
  Headers,
  Res,
  Post,
  Get,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import * as _ from 'lodash';

import { AuthorService } from '~/resources/authors/author.service';

import { CreatePostHeadersDto, CreatePostBodyDto } from './dto/create-post.dto';
import { ListPostsQueryDto } from './dto/list-posts.dto';
import {
  ListPostsByAuthorParamsDto,
  ListPostsByAuthorQueryDto,
} from './dto/list-posts-by-author.dto';
import { GetPostQueryDto } from './dto/get-post.dto';
import {
  UpdatePostParamsDto,
  UpdatePostBodyDto,
  UpdatePostHeadersDto,
} from './dto/update-post.dto';
import { DeletePostParamsDto, DeletePostHeadersDto } from './dto/delete-post.dto';

import { PostService } from './post.service';

@Controller('authors')
export class PostController {
  constructor(private authorService: AuthorService, private postService: PostService) {}

  @Post('/posts')
  async createPost(
    @Headers() headers: CreatePostHeadersDto,
    @Body() body: CreatePostBodyDto,
    @Res() response: Response
  ) {
    const { title, text } = body;

    const author = await this.authorService.findAuthor({ name: headers['x-author'] });

    if (!author) {
      return response.status(400).send({ error: 'unexistentAuthor' });
    }

    await this.postService.createPost({ authorId: author.id, title, text });

    return response.sendStatus(201);
  }

  @Get('/posts')
  async listPosts(@Query() query: ListPostsQueryDto, @Res() response: Response): Promise<Response> {
    const { posts, count } = await this.postService.findManyPosts(query.page);

    return response.header('X-Total-Count', count.toString()).send(posts);
  }

  @Get(':authorId/posts')
  async listPostsByAuthor(
    @Param() params: ListPostsByAuthorParamsDto,
    @Query() query: ListPostsByAuthorQueryDto,
    @Res() response: Response
  ): Promise<Response> {
    const { posts, count } = await this.postService.findManyPosts(query.page, {
      authorId: params.authorId,
    });

    return response.header('X-Total-Count', count.toString()).send(posts);
  }

  @Get('/posts/:id')
  async getPost(@Param() params: GetPostQueryDto, @Res() response: Response): Promise<Response> {
    const post = await this.postService.findPostById(params.id);

    if (!post) {
      return response.status(400).send({ error: 'unexistentPost' });
    }

    return response.send(post);
  }

  @Patch('/posts/:id')
  async updatePost(
    @Headers() headers: UpdatePostHeadersDto,
    @Param() params: UpdatePostParamsDto,
    @Body() body: UpdatePostBodyDto,
    @Res() response: Response
  ): Promise<Response> {
    const { title, text } = body;

    const author = await this.authorService.findAuthor({ name: headers['x-author'] });

    if (!author) {
      return response.status(400).send({ error: 'unexistentAuthor' });
    }

    const post = await this.postService.findPostById(params.id);

    if (!post) {
      return response.status(400).send({ error: 'unexistentPost' });
    }
    if (post.authorId !== author.id) {
      return response.sendStatus(403);
    }

    await this.postService.updatePost(
      post.id,
      _.omitBy({ title, text }, _.isEmpty) // omitBy() will remove empty values
    );

    return response.sendStatus(204);
  }

  @Delete('/posts/:id')
  async deletePost(
    @Headers() headers: DeletePostHeadersDto,
    @Param() params: DeletePostParamsDto,
    @Res() response: Response
  ): Promise<Response> {
    const author = await this.authorService.findAuthor({ name: headers['x-author'] });

    if (!author) {
      return response.status(400).send({ error: 'unexistentAuthor' });
    }

    const post = await this.postService.findPostById(params.id);

    if (!post) {
      return response.status(400).send({ error: 'unexistentPost' });
    }
    if (post.authorId !== author.id) {
      return response.sendStatus(403);
    }

    await this.postService.deletePost(post.id);

    return response.sendStatus(204);
  }
}
