import express from 'express'
import cors from 'cors'
import "dotenv/config";
import * as RecipeAPI from './recipe-api'
// import {PrismaClient} from '@prisma/client';

const app = express();
// const prismaClient = new PrismaClient(); // sync the database

app.use(express.json()) // req res to json
app.use(cors()) // security

app.get("/api/recipes/search",async(req, res)=>{
    // res.json({message:'success'})
    const searchTerm = req.query.searchTerm as string;
    const page = parseInt(req.query.page as string);
    const results = await RecipeAPI.serachRecipes(searchTerm, page); // wait this compleete
    return res.json(results)
})

app.post("/api/recipes/favourite",async(req, res)=>{
    const recipeId = req.body.recipeId;
    // try {
    //     const favouriteRecipe = await prismaClient.favouriteRecipe.create({
    //         data: {
    //             recipeId: recipeId
    //         }
    //     });
    //     return res.status(201).json(favouriteRecipe); // create success   
    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({error: "oops, something went wrong"})         
    // }


})

app.get("/api/recipes/:recipeId/summary" // : half param
    , async (req, res)=>{ // function express-> req res
        const recipeId = req.params.recipeId;
        const results = await RecipeAPI.getRecipeSummary(recipeId);
        return res.json(results);
        
})

app.get("/api/recipes/favourite" // : half param
    , async (req, res)=>{ // function express-> req res
        try {
            // TODO DB
            // const favourites = await RecipeAPI.getFavouriteRecipeByIDs(recipesIds)
            // return res.json(favourites);
        } catch (error) {
               
        }
})

app.delete("/api/recipes/favourite",async(req,res)=>{
    const recipeId = req.body.recipeId;
    try {
        // await prismaClient
    } catch (error) {
        
    }
})

app.listen(5000, ()=>{
    console.log('server running on localhost:5000')
})