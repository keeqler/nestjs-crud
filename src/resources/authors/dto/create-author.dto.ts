import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAuthorBodyDto {
  @IsNotEmpty()
  @MaxLength(30)
  readonly name: string;
}
