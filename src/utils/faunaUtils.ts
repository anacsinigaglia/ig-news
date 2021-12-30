import { query as q } from 'faunadb';

type DataType = {
  data: { email: string };
};

export const usersCollection = 'users';
export const emailIndex = 'user_by_email';

export const getByIndex = (userData: string, index = emailIndex) =>
  q.Get(q.Match(q.Index(index), q.Casefold(userData)));

export const createInCollection = (
  userData: DataType,
  collection = usersCollection
) => q.Create(q.Collection(collection), userData);
