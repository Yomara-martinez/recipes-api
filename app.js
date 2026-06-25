const express = require("express");
const { title } = require("node:process");
const app = express();
app.use(express.json());

let recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    cuisine: "Italian",
    minutes: 25,
    servings: 4,
    vegetarian: false,
  },
  {
    id: 2,
    title: "Chana Masala",
    cuisine: "Indian",
    minutes: 35,
    servings: 4,
    vegetarian: true,
  },
  {
    id: 3,
    title: "Fish Tacos",
    cuisine: "Mexican",
    minutes: 20,
    servings: 3,
    vegetarian: false,
  },
  {
    id: 4,
    title: "Margherita Pizza",
    cuisine: "Italian",
    minutes: 40,
    servings: 2,
    vegetarian: true,
  },
  {
    id: 5,
    title: "Pad Thai",
    cuisine: "Thai",
    minutes: 30,
    servings: 2,
    vegetarian: false,
  },
];

let nextId = 6;

app.use(middleware);


app.get("/api/recipes/", (req, res, next ) => {

try{

  res.json(recipes);

}catch(err){
next(err)
  }
});
app.get("/api/recipes/:id", (req, res, next ) => {

    try{
  const getRecipe = Number(req.params.id);
  const found = recipes.find((elem) => elem.id === getRecipe);
  if (!found) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.json(found);

}
catch(err){
    next(err)
}
});
app.post("/api/recipes", secondMiddleware, (req, res, next ) => {
 // console.log("POST recipe req.body", req.body);
try{

  const { title, cuisine, minutes, servings, vegetarian } = req.body;
  const newRecipe = {
    id: nextId++,
    title,
    cuisine,
    minutes,
    servings,
    vegetarian,
  };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);

}

catch(err){
    next(err)
}
});

app.patch("/api/recipes/:id", (req, res, next ) => {

try{

  const recipeId = Number(req.params.id);
  const { title, cuisine, minutes, servings, vegetarian } = req.body;
  const foundRecipe = recipes.find((elem) => elem.id === recipeId);
  if (foundRecipe) {
    const updatedRecipe = Object.assign(foundRecipe, req.body);
    res.json(updatedRecipe);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
}catch(err){
    next(err)
}
});

app.delete("/api/recipes/:id", (req, res, next) => { //try slice in book

    try{

  const recipeId = Number(req.params.id);
  const foundRecipe = recipes.find((elem) => elem.id === recipeId);
  if (!foundRecipe) {
    return res.status(404);
  }
  const newRecipes = recipes.filter((elem) => elem.id !== recipeId);
  recipes = newRecipes;

  res.json(newRecipes)
}
catch(err){
    next(err)
}
});


 function middleware(req, res, next) {
   console.log(req.method, req.originalUrl);
   next();
 }


  
function secondMiddleware(req, res, next) {

  const{ title, cuisine } = req.body;
  
  if (title && cuisine) {
  
  } else{
     res.status(400).send("ERROR");
  }
next()
  }

function errorHandler(err, req, res, next ) {
  console.error(err);
  res.sendStatus(500);
}




app.listen(8080, () => console.log("Server running on port 8080"));

