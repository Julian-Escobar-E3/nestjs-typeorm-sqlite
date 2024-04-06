import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Person} from './person/entities/person.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'sqlite',database:'db/firstdb',
    synchronize:true,
    entities:[Person]
  }), PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
