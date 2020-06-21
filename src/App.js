const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];



app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repositorie = { id: uuid(), title, url, techs, likes: 0 }
  repositories.push(repositorie);

  return response.json(repositorie)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex(repositorie => repositorie.id === id);
  const repoLikes = repositories.find(repo => repo.id ===id);
  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' })
  }

  const repositorie = { id, title, url, techs, likes: repoLikes.likes }

  repositories[repoIndex] = repositorie;
  return response.json(repositorie)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(repositorie => repositorie.id === id);
  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repositorie not found.' })
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/:command/like", (request, response) => {
  const { id, command } = request.params;
  const repositorie = repositories.find(repo => repo.id === id)
  if (typeof repositorie === "undefined") {
    return response.status(400).send();
  }

  command === '+' ? repositorie.likes++ : repositorie.likes--

  return response.json(repositorie)
});

module.exports = app;
