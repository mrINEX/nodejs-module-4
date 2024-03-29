import * as addUsersToGroupRepository from './add_users_to_group.DB';

export const addUsersToGroup = (groupId: string, userId: string): Promise<boolean> => {
  return addUsersToGroupRepository.addUsersToGroup(groupId, userId);
};
