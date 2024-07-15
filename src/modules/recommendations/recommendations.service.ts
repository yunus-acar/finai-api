import { Injectable } from '@nestjs/common';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { RecommendationsRepository } from './recommendations.repository';

@Injectable()
export class RecommendationsService {
  constructor(private repository: RecommendationsRepository) {}

  async createRecommendation(
    recommendation: CreateRecommendationDto,
  ): Promise<void> {
    return this.repository.createRecommendation(recommendation);
  }
}
