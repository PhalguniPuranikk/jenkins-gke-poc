const express = require("express");
const cors = require("cors");
const { Firestore } = require("@google-cloud/firestore");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const firestore = new Firestore({
  projectId: "project-8eacb774-b98f-4022-8f6",
  databaseId: "firestore-database"
});

app.get("/", (req, res) => {
  res.send("TaskFlow Firestore API Running");
});

app.get("/tasks", async (req, res) => {
  try {
    const snapshot = await firestore.collection("tasks").get();

    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;

    const docRef = await firestore.collection("tasks").add({
      title,
      completed: false,
      createdAt: new Date(),
    });

    res.status(201).json({
      id: docRef.id,
      message: "Task created",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
