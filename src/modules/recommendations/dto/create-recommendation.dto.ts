import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRecommendationDto {
  @IsString()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNumber()
  userId: number;
}
