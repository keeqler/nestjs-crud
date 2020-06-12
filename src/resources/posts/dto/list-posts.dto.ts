import { IsNotEmpty, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class ListPostsQueryDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Transform(value => Number(value))
  readonly page: number;
}
