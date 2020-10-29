const express = require("express");
const cors = require("cors");

const { v4, validate } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: v4(),
    likes: 0,
    title,
    url,
    techs,
  }

  repositories.push(repository)

  return response.status(201).json(repository)

});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body
  const data = {title, url, techs};

  const searchedRepositoryIndex = repositories.findIndex(repository => {
    return repository.id == id
  })

  if(searchedRepositoryIndex < 0) {
    return response.status(400).send();
  }

  const searchedRepository = repositories[searchedRepositoryIndex]

  for(var ind in data) {
    searchedRepository[ind] = data[ind]
  }

  return response.json(searchedRepository)
});

app.delete("/repositories/:id", (request, response) => {
 const {id} = request.params

 const searchedRepositoryIndex = repositories.findIndex(repository => {
   return repository.id == id;
  })
  
  if(searchedRepositoryIndex < 0) {
   return response.status(400).send()
  }

  repositories.splice(searchedRepositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params

  const searchedRepositoryIndex = repositories.findIndex(repository => {
    return repository.id == id
  })

  if(searchedRepositoryIndex < 0) {
    return response.status(400).send()
  }

  const searchedRepository = repositories[searchedRepositoryIndex];
  searchedRepository.likes++;

  return response.json(searchedRepository)
});

module.exports = app;
