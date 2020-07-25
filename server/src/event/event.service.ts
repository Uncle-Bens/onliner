import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../models/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
  constructor(@InjectRepository(Event) private readonly repo: Repository<Event>) { }

  public async getAll() {
    return await this.repo.find();
  }
}
