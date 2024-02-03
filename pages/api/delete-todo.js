import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
   
      const  id  = req.query.id;

      const client = await MongoClient.connect(
        "mongodb+srv://roshgupta17:Anika123456@cluster0.dlnrdlu.mongodb.net/todos?retryWrites=true&w=majority"
      );
      const db = client.db();
      const todosCollection = db.collection("todos");

      // Delete the todo item
      const result = await todosCollection.deleteOne({ _id: new ObjectId(id) });

      client.close();

      if (result.deletedCount === 1) {
        return res.status(200).json({ message: "Todo deleted successfully" });
      } else {
        return res.status(404).json({ message: "Todo not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}

export default handler;
