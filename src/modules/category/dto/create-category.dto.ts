import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmpty()
  @IsOptional()
  @IsString()
  parentId: string;
}
