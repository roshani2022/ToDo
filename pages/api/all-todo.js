import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db();
      const todosCollection = db.collection("todos");

      const result = await todosCollection
        .find({ status: "incomplete" })
        .toArray();

      console.log(result);

      client.close();

      res.status(200).json({ todos: result });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

export default handler;
