import * as _ from 'lodash';
import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '../config/config.service';
import { EventDTO } from 'src/event/event.dto';
import { EventService } from 'src/event/event.service';
import { Event } from 'src/models/event.entity';

async function run() {

  const seedId = Date.now()
    .toString()
    .split('')
    .reverse()
    .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const itemService = new EventService(connection.getRepository(Event));

  const work = _.range(1, 10)
    .map(n => EventDTO.from({
      name: `seed${seedId}-${n}`,
      description: 'created from seed'
    }))
    .map(dto => itemService.create(dto)
      .then(r => (console.log('done ->', r.name), r)))

  return await Promise.all(work);
}

run()
  .then(_ => console.log('...wait for script to exit'))
  .catch(error => console.error('seed error', error));
