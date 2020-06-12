import { IsNotEmpty, IsInt, Min, MaxLength, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdatePostParamsDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Transform(value => Number(value))
  readonly id: number;
}

export class UpdatePostBodyDto {
  @ValidateIf((body: UpdatePostBodyDto) => !body.text)
  @IsNotEmpty()
  @MaxLength(30)
  readonly title: string;

  @ValidateIf((body: UpdatePostBodyDto) => !body.title)
  @IsNotEmpty()
  @MaxLength(255)
  readonly text: string;
}

export class UpdatePostHeadersDto {
  readonly 'x-author': string;
}
