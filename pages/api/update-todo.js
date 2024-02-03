
import { MongoClient,ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { id, status } = req.body;

      const client = await MongoClient.connect(
        "mongodb+srv://roshgupta17:Anika123456@cluster0.dlnrdlu.mongodb.net/todos?retryWrites=true&w=majority"
      );
      const db = client.db();
      const todosCollection = db.collection("todos");

      // Update the status of the todo item
      await todosCollection.updateOne(
        { _id:ObjectId(id) },
        { $set: { status: status } }
      );

      client.close();

      res.status(200).json({ message: "Todo updated successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

export default handler;
