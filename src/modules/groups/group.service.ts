import * as groupsRepository from './group.DB';
import { Group, InputGroup } from './group.model';

export const create = (properties: InputGroup): Promise<Group | null> => {
  return groupsRepository.createInDB(properties);
};

export const get = (id: string): Promise<Group | null> => {
  return groupsRepository.getByIdDB(id);
};

export const getAll = (): Promise<Group[]> => {
  return groupsRepository.getByAllDB();
};

export const update = (id: string, properties: InputGroup): Promise<number> => {
  return groupsRepository.updateInDB(id, properties);
};

export const remove = (id: string): Promise<Group | null> => {
  return groupsRepository.deleteInDB(id);
};
