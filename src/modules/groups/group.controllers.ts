import * as groupsService from './group.service';
import { Request, Response } from 'express';

export const postMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { name, permissions } = req.body;

  const group = await groupsService.create({ name, permissions });

  if (group) {
    res.json({ group });
  } else {
    res.status(403).json({ group, message: `Group with this "${name}" name exist` });
  }
};

export const getMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const group = await groupsService.get(id);

  if (group) {
    res.json({ group });
  } else {
    res.status(404).json({ group });
  }
};

export const getAllMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const groups = await groupsService.getAll();

  res.json({ groups });
};

export const putMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { name, permissions } = req.body;
  const { id } = req.params;

  const affected = await groupsService.update(id, { name, permissions });

  res.json({ affected });
};

export const deleteMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const group = await groupsService.remove(id);

  if (group) {
    res.json({ group });
  } else {
    res.status(404).json({ group });
  }
};
