import { getByIndex, subscriptionByIdIndex } from "./../../utils/faunaUtils";
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
  customerId: string,
  createAction = false
) {
  const userRef = await fauna.query(
    q.Select("ref", getByIndex(stripeIdIndex, undefined, customerId))
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  if (createAction) {
    await fauna.query(
      createInCollection({ data: subscriptionData }, subscriptionCollection)
    );
  } else {
    await fauna.query(
      q.Replace(
        //replace all data instead of only updating a specific prop
        q.Select(
          "ref",
          getByIndex(subscriptionByIdIndex, undefined, subscriptionId)
        ),
        { data: subscriptionData }
      )
    );
  }
}
