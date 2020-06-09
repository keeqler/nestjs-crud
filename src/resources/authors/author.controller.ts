import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';

import { CreateAuthorBodyDto } from './dto/create-author.dto';

import { AuthorService } from './author.service';

@Controller('authors')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Post()
  async createAuthor(
    @Body() body: CreateAuthorBodyDto,
    @Res() response: Response
  ): Promise<Response> {
    return response.status(201).send(await this.authorService.createAuthor(body));
  }
}
