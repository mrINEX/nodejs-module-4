import { OutputUser } from '../users/user.model';

function getAutoSuggestUsers(memoryUsers: OutputUser[], loginSubstring: string, limit: number): OutputUser[] {
  const regex = new RegExp(`^${loginSubstring}`);

  const filteredUsers = memoryUsers.filter((user) => regex.test(user.login));

  if (Number.isNaN(limit) || !limit) return filteredUsers;
  return filteredUsers.slice(0, limit);
}

export default getAutoSuggestUsers;
