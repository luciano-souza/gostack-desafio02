const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  //Por enquanto retornando todo
  return response.json(repositories);

});


app.post("/repositories", (request, response) => {

  const { url, title, techs } = request.body;

  const repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);


});


app.put("/repositories/:id", (request, response) => {

  const { id } = request.params;
  const { url, title, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository Not Found.' });
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes,
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository Not Found.' });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();

});

//Incremt the Likes of a repository
app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository Not Found.' });
  }

  repositories[repositoryIndex].likes += 1;

  return response.json(repositories[repositoryIndex]);

});

module.exports = app;
