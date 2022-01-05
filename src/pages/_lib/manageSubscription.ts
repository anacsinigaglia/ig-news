import { query as q } from "faunadb";
import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";
import {
  createInCollection,
  stripeIdIndex,
  subscriptionCollection,
} from "../../utils/faunaUtils";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string
) {
  const userRef = await fauna.query(
    q.Select("ref", q.Get(q.Match(q.Index(stripeIdIndex), customerId)))
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  await fauna.query(
    createInCollection({ data: subscriptionData }, subscriptionCollection)
  );
}
