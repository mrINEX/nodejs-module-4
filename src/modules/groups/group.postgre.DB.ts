import { InputGroup, Group } from './group.model';

export const createInPostgreDB = async (properties: InputGroup): Promise<Group | null> => {
  const groupExist = await Group.findOne({ name: properties.name });
  if (groupExist) return null;

  const group = new Group();
  Object.assign(group, properties);
  return await group.save();
};

export const getByIdPostgreDB = async (id: string): Promise<Group | null> => {
  try {
    const group = await Group.findOne({ id });
    if (group) {
      return group;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

export const getByAllPostgreDB = async (): Promise<Group[]> => {
  return await Group.find();
};

export const updateInPostgreDB = async (id: string, properties: InputGroup): Promise<number> => {
  const group = await Group.update({ id }, properties);
  return group.affected;
};

export const deleteInPostgreDB = async (id: string): Promise<Group | null> => {
  try {
    const group = await Group.findOne({ id });
    return await Group.remove(group);
  } catch (err) {
    return null;
  }
};
