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
    const { name } = body;

    const authorNameInUse = await this.authorService.findAuthor({ name });

    if (authorNameInUse) {
      return response.status(400).send({ error: 'nameInUse' });
    }

    await this.authorService.createAuthor({ name });

    return response.status(201).send();
  }
}
