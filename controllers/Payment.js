const midtransClient = require("midtrans-client");

const paymentController = {
  chargeRequest: (req, res) => {
    console.log(req, 'req')
    let core = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: "SB-Mid-server-e5_OvUPOJna-syKCpsdoBKLz",
      clientKey: "SB-Mid-client-2zSi5A8VL9adkhsn",
    });

    let parameter = {
      payment_type: "gopay",
      transaction_details: {
        order_id: req.body.order_id,
        gross_amount: req.body.total_payment,
      },
      gopay: {
        enable_callback: true, // optional
        callback_url: `http://localhost:3000/gopay_success/${req.body.order_id}`, // optional
      },
    };

    // charge transaction
    core.charge(parameter).then((chargeResponse) => {
      res.status(chargeResponse.status_code).send(chargeResponse);
    });
  },
};

module.exports = paymentController;
