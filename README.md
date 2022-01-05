## Don't forget to _fill the .env_ and _install stripe-cli_!!!

######

# Stripe-cli in use

1. Install according to the O.S.;
2. $ stripe login (then allow it)
3. $ stripe listen --forward-to localhost:3000/api/webhooks
4. You can test it by using a fake credit card inside the application, such as 4242 4242 4242 4242, and checking in the terminal if it has succeeded by the showing events
5. Fill STRIPE_WEBHOOK_SECRET in .env with the secret key available on terminal

######
