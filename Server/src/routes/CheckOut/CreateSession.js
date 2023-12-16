const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51OLAvzH7aI4EeVzAErUvtTrVVcJ7c4L05sofuZUqYmynnxgmFzOzccL0h4eqNcUqMq3YKAHalSNcpcuqSdcPRzxr00ui5lhVT5"
);

const createSession = async (req, res) => {
  const { imagen, productName, productDescription, unitAmount } = req.body;  // RECIBE DESDE http://localhost:3001/checkout/session

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
          
            product_data: {
              name: productName,
              description: productDescription,
              // images:[imagen]
            },
             unit_amount:unitAmount,
          },
          quantity: 1,
        }
      ],
      mode: "payment",
      success_url: "https://e-commerce-pf-henry.onrender.com/checkout/success",
      cancel_url: "https://e-commerce-pf-henry.onrender.com/checkout/cancel",
    });

    return res.json(session.url);
  } catch (error) {
    console.error("Error creating session:", error);
    return res.status(500).json({ error: error });
  }
};
module.exports = createSession;
