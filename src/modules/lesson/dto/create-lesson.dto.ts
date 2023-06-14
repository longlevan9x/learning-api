import { IsArray, IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  bookId: string;

  @IsOptional()
  @IsArray()
  sections: string[];
}
