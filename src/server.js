// const express = require("express");
import express from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const app = express();
const port = 4000;

// temp data einbinden
// const recipes = require("../assets/temp-data.json");

// http://localhost:4000/api/recipes
app.get("/api/recipes", async (req, res) => {
  const recipes = await prisma.recipe.findMany({
    include: { ingredients: true },
  });
  res.json(recipes);
});

// GET recipes/id
app.get("/api/recipes/:id", async (req, res) => {
  const id = req.params.id;

  const recipe = await prisma.recipe.findUnique({
    where: { id: Number(id) },
    include: { ingredients: true },
  });

  if(!recipe)
    res.status(404).json({message: "Recipe not found!"})
  
  res.json(recipe);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
