import { Request, Response } from 'express';
import * as groupsService from './group.service';
import { InputGroup, GroupType } from './group.model';

export const postMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { name, permissions } = req.body as InputGroup;

  const group = await groupsService.create({ name, permissions });

  if (group) {
    res.json(group);
  } else {
    res.status(400).json({ message: `Group with this "${name}" name exist` });
  }
};

export const getMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as Pick<GroupType, 'id'>;

  const group = await groupsService.get(id);

  if (group) {
    res.json(group);
  } else {
    res.status(404).json({ message: 'Group not found' });
  }
};

export const getAllMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const groups = await groupsService.getAll();

  res.json({ groups });
};

export const putMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { name, permissions } = req.body as InputGroup;
  const { id } = req.params as Pick<GroupType, 'id'>;

  const affected = await groupsService.update(id, { name, permissions });

  if (affected) {
    res.json({ affected });
  } else {
    res.status(404).json({ message: 'Group not found' });
  }
};

export const deleteMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as Pick<GroupType, 'id'>;

  const group = await groupsService.remove(id);

  if (group) {
    res.json(group);
  } else {
    res.status(404).json({ message: 'Group not found' });
  }
};
