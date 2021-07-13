const express = require("express");
const app = express();
const stripe = require("stripe")("pk_test_51JCkxXJs4zdqPpNvTEmrXv7TOQDzOmcwognmcmWMViz1axk5gv5Vj6CJwysBOwEOlRRUdUvJs9ViHJhTRdy4KyA1006J8ldmIW");

app.use(express.static("."));
app.use(express.json());

const calculateOrderAmount = items => {
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.listen(4242, () => console.log('Node server listening on port 4242!'));
