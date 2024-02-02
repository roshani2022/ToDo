import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            const { text,status} = data;

            // Connect to MongoDB
            const client = await MongoClient.connect('mongodb+srv://roshgupta17:Anika123456@cluster0.dlnrdlu.mongodb.net/todos?retryWrites=true&w=majority')
            const db = client.db();
            const todosCollection = db.collection('todos');

            // Insert meetup data into the collection
            const result = await todosCollection.insertOne(data);

            console.log(result);

            // Close the MongoDB connection
            client.close();

            // Send a success response
            res.status(201).json({ message: "Todo Added" });
        } catch (error) {
            // Handle any errors that occur during the try block
            console.error("Error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }

    if (req.method === "GET") {
        try {
          const data = req.body;
          const { text } = data;
    
          const client = await MongoClient.connect(
            "mongodb+srv://roshgupta17:Anika123456@cluster0.dlnrdlu.mongodb.net/todos?retryWrites=true&w=majority"
          );
          const db = client.db();
          const todosCollection = db.collection("todos");
    
          const result = await todosCollection.find(data);
    
          console.log(result);
    
          client.close();
    
          res.status(201).json({ message: "Todo Received" });
        } catch (error) {
          // Handle any errors that occur during the try block
          console.error("Error:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      } else {
        res.status(405).json({ message: "Method Not Allowed" });
      }
}

export default handler;

