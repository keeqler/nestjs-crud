import { IsNotEmpty, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class ListPostsByAuthorParamsDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Transform(value => Number(value))
  readonly authorId: number;
}

export class ListPostsByAuthorQueryDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Transform(value => Number(value))
  readonly page: number;
}
