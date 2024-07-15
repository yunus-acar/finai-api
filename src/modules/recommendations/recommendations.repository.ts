import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RecommendationEntity } from './recommendation.entity';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';

@Injectable()
export class RecommendationsRepository extends Repository<RecommendationEntity> {
  constructor(private dataSource: DataSource) {
    super(RecommendationEntity, dataSource.createEntityManager());
  }

  async createRecommendation(
    recommendation: CreateRecommendationDto,
  ): Promise<void> {
    await this.save(recommendation);
  }
}
