import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePostBodyDto {
  @IsNotEmpty()
  @MaxLength(30)
  readonly title: string;

  @IsNotEmpty()
  @MaxLength(255)
  readonly text: string;
}

export class CreatePostHeadersDto {
  readonly 'x-author': string;
}
