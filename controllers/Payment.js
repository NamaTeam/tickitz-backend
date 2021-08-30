const midtransClient = require("midtrans-client");
require("dotenv");

const paymentController = {
  chargeRequestGopay: (req, res) => {
    let core = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    let parameter = {
      payment_type: "gopay",
      transaction_details: {
        order_id: req.body.order_id,
        gross_amount: req.body.total_payment,
      },
      gopay: {
        enable_callback: true, // optional
        callback_url: `${process.env.REDIRECT_ORIGIN}/payment_success`, // optional
      },
    };

    // charge transaction
    core.charge(parameter).then((chargeResponse) => {
      res.status(chargeResponse.status_code).send(chargeResponse);
    });
  },
};

module.exports = paymentController;
