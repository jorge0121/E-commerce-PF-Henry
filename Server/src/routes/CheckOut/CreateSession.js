const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51OLAvzH7aI4EeVzAErUvtTrVVcJ7c4L05sofuZUqYmynnxgmFzOzccL0h4eqNcUqMq3YKAHalSNcpcuqSdcPRzxr00ui5lhVT5"
);

const createSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          product_data: {
            name: "LibroPrueba",
            description: "descripcion Prueba",
          },
          currency: "usd",
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3001/checkout/success",
    cancel_url: "http://localhost:3001/checkout/cancel",
  });
  return res.json(session);
};

module.exports = createSession;
