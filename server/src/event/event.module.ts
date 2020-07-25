import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { Event } from '../models/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventService],
  controllers: [EventController],
  exports: []
})
export class EventModule { }