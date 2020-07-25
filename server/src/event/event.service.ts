import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../models/event.entity';
import { Repository } from 'typeorm';
import { EventDTO } from './event.dto';

@Injectable()
export class EventService {
  constructor(@InjectRepository(Event) private readonly repo: Repository<Event>) { }

  public async getAll(): Promise<EventDTO[]> {
    return await this.repo.find()
      .then(items => items.map(e => EventDTO.fromEntity(e)));
  }

  public async create(dto: EventDTO): Promise<EventDTO> {
    const eventDto = new EventDTO(dto);
    return this.repo.save(eventDto.toEntity())
      .then(e => EventDTO.fromEntity(e));
  }
}
