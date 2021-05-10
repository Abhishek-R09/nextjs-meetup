// POST /api/new-meetup
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const { title, image, address, description } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://admin-abhishek:67z56rQ8aXjfjxKm@cluster0.rzdh9.mongodb.net/meetupsDB?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne({ ...data });

    console.log(result);
    client.close();
    res.status(201).json({ message: "Meetup inserted!" });
  }
}
