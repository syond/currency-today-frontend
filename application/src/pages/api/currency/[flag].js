const database = {
  currencies_exchange: [
    {
      currency_code: "USD",
      currency_name: null,
      currency_symbol: null,
      price: 4.7569,
    },
    {
      currency_code: "EUR",
      currency_name: null,
      currency_symbol: null,
      price: 5.3538,
    },
    {
      currency_code: "GBP",
      currency_name: null,
      currency_symbol: null,
      price: 6.1927,
    },
    {
      currency_code: "JPY",
      currency_name: null,
      currency_symbol: null,
      price: 0.03429,
    },
    {
      currency_code: "CHF",
      currency_name: null,
      currency_symbol: null,
      price: 5.6471,
    },
    {
      currency_code: "CAD",
      currency_name: null,
      currency_symbol: null,
      price: 3.6619,
    },
    {
      currency_code: "AUD",
      currency_name: null,
      currency_symbol: null,
      price: 3.2865,
    },
  ],
  currency_id: "BRL",
  updatedAt: "2023-12-18T22:22:28.974911",
};

export default function currencyHandler(req, res) {
  const { query, method } = req;
  const flag = query.flag;

  switch (method) {
    case "GET":
      // Get data from your database
      // res.status(200).json({ price: database[flag] });
      res.status(200).json(database);
      break;
    case "PUT":
      // Update or create data in your database
      res.status(200).json({ flag });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
