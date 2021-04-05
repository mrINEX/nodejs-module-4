import { OutputUser } from '../users/user.model';

function getAutoSuggestUsers(
  memoryUsers: OutputUser[], loginSubstring: string, limit: number
  ): OutputUser[] {
  const regex = new RegExp(`^${loginSubstring.toLowerCase()}`);
  
  const filteredUsers = memoryUsers.filter((user) => {
    return regex.test(user.login.toLowerCase()) && !user.isDeleted;
  });

  return filteredUsers.slice(0, limit);
}

export default getAutoSuggestUsers;
