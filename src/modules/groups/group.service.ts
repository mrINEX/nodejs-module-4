import * as groupsRepository from './group.DB';
import { Group, InputGroup } from './group.model';

export const create = (properties: InputGroup): Promise<Group | null> => {
  return groupsRepository.createInPostgreDB(properties);
};

export const get = (id: string): Promise<Group | null> => {
  return groupsRepository.getByIdPostgreDB(id);
};

export const getAll = (): Promise<Group[]> => {
  return groupsRepository.getByAllPostgreDB();
};

export const update = (id: string, properties: InputGroup): Promise<number> => {
  return groupsRepository.updateInPostgreDB(id, properties);
};

export const remove = (id: string): Promise<Group | null> => {
  return groupsRepository.deleteInPostgreDB(id);
};
