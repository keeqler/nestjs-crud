import { IsNotEmpty, IsInt, Min, MaxLength, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';

export class EditPostParamsDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Transform(value => Number(value))
  readonly id: number;
}

export class EditPostBodyDto {
  @ValidateIf((body: EditPostBodyDto) => !body.text)
  @IsNotEmpty()
  @MaxLength(30)
  readonly title: string;

  @ValidateIf((body: EditPostBodyDto) => !body.title)
  @IsNotEmpty()
  @MaxLength(255)
  readonly text: string;
}

export class EditPostHeadersDto {
  readonly 'x-author': string;
}
