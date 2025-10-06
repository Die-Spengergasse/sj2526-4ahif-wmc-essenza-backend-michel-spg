const express = require("express");
const app = express();
const port = 4000;

// temp data einbinden
const recipes = require("../assets/temp-data.json");

app.get("/api/recipes", (req, res) => {
  res.json(recipes);
});

// GET recipes/id
app.get("/api/recipes/:id", (req, res) => {
  const id = req.params.id;

  const recipe = recipes.find((recipe) => recipe.id === id)

  if(!recipe)
    res.status(404).json({message: "Recipe not found!"})
  
  res.json(recipe);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
