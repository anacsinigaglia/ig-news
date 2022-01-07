import { query as q } from "faunadb";

export const usersCollection = "users";
export const subscriptionCollection = "subscriptions";

export const emailIndex = "user_by_email";
export const stripeIdIndex = "user_by_stripe_customer_id";
export const subscriptionByIdIndex = "subscription_by_id";

export const getByIndex = (index: string, userData?: string, terms?: string) =>
  userData
    ? q.Get(q.Match(q.Index(index), q.Casefold(userData)))
    : q.Get(q.Match(q.Index(index), terms));

export const createInCollection = (
  userData: q.ExprArg,
  collection = usersCollection
) => q.Create(q.Collection(collection), userData);
