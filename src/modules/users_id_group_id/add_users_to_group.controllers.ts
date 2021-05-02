import { Request, Response } from 'express';
import * as addUsersToGroupService from './add_users_to_group.service';

export const addUsersToGroupMiddleware = async (req: Request, res: Response): Promise<void> => {
  const { groupId, userId } = req.params;

  const result = await addUsersToGroupService.addUsersToGroup(groupId, userId);

  if (result) {
    res.json({ result });
  } else {
    res.status(404).json({ message: 'User or Group not found' });
  }
};
