import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { LoggerRepository } from './logger.repository';

@Injectable()
export class LoggerService {
  constructor(private repository: LoggerRepository) {}

  async createLog(log: CreateLogDto) {
    return this.repository.createLog(log);
  }
}
