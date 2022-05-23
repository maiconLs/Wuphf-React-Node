import "reflect-metadata";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.static("public"));

import UserRoutes from "./src/routes/UserRoutes";
import PostsRoutes from "./src/routes/PostsRoutes";

app.use("/users", UserRoutes);
app.use("/posts", PostsRoutes);

app.listen(5000, () => console.log("Server is running"));
