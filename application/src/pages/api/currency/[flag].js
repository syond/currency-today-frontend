const database = {
  uk: 3.23,
  usa: 4.98,
  ue: 5.23,
}

export default function currencyHandler(req, res) {
  const { query, method } = req;
  const flag = query.flag;

  switch (method) {
    case "GET":
      // Get data from your database
      res.status(200).json({ price: database[flag] });
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
