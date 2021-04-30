const midtransClient = require("midtrans-client");

const paymentController = {
  chargeRequest: (req, res) => {
    let core = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: "SB-Mid-server-e5_OvUPOJna-syKCpsdoBKLz",
      clientKey: "SB-Mid-client-2zSi5A8VL9adkhsn",
    });

    let parameter = {
      payment_type: "gopay",
      transaction_details: {
        gross_amount: 12145,
        order_id: "test-transaction-54321",
      },
      gopay: {
        enable_callback: true, // optional
        callback_url: "someapps://callback", // optional
      },
    };

    // charge transaction
    core.charge(parameter).then((chargeResponse) => {
      res.status(chargeResponse.status_code).send(chargeResponse);
    });
  },
};

module.exports = paymentController;
