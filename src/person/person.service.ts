import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {toArray} from 'rxjs';
import e from 'express';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepo: Repository<Person>,
  ) {}
  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    try {
      const person = this.personRepo.create(createPersonDto);
      const createdPerson = await this.personRepo.save(person);
      return createdPerson;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Check logs');
    }
  }

  async findAll(): Promise<Person[]> {
    const persons = await this.personRepo.find();
    return persons;
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.personRepo.findOne({ where: { id: id } });
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
    try {
      const person = await this.findOne(id);
      Object.assign(person, updatePersonDto);
      const updatedPerson = await this.personRepo.save(person);
      return updatedPerson;
    } catch (error) {
      throw new InternalServerErrorException('Que pasoooooo ');
    }
  }

  async remove(id: number) {
    try {
      const person = await this.findOne(id);
      if (!person) {
        throw new NotFoundException('NO hay')
      } else {
        this.personRepo.delete(person.id);
      }
    } catch (error) {
      console.log(error)
        return error.message;
    }
  }
}
