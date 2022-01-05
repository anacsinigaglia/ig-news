import { query as q } from "faunadb";

export const usersCollection = "users";
export const subscriptionCollection = "subscriptions";
export const emailIndex = "user_by_email";
export const stripeIdIndex = "user_by_stripe_customer_id";

export const getByIndex = (userData: string, index = emailIndex) =>
  q.Get(q.Match(q.Index(index), q.Casefold(userData)));

export const createInCollection = (
  userData: any,
  collection = usersCollection
) => q.Create(q.Collection(collection), userData);
