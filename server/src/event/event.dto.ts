import { Event } from "../models/event.entity"
import { IsString, IsUUID, } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class EventDTO implements Readonly<EventDTO> {

  constructor(obj?: EventDTO) {
    Object.assign(this, obj);
  }
  
  @ApiProperty({ description: 'Universally unique identifier ' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Bike Expo', description: 'The name of the Event' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'The largest bike expo', description: 'The description of the event' })
  @IsString()
  description: string;

  public static from(dto: Partial<EventDTO>): EventDTO {
    const it = new EventDTO();
    it.id = dto.id;
    it.name = dto.name;
    it.description = dto.description;
    return it;
  }

  public static fromEntity(entity: Event): EventDTO {
    return this.from({
      id: entity.id,
      name: entity.name,
      description: entity.description
    });
  }

  public toEntity(): Event {
    const it = new Event();
    it.id = this.id;
    it.name = this.name;
    it.description = this.description;
    it.createDateTime = new Date();
    it.createdBy = 'user';
    it.lastChangedBy = 'user';
    return it;
  }
}