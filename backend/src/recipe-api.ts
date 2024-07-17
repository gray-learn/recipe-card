import { searchRecipes } from './../../frontend/src/api';
const apiKey = process.env.API_KEY;

export const serachRecipes = async (searchTerm: string, page: number) => {
    if(!apiKey) {// empty
        throw new Error("API KEY not found")
    }

    const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
    const queryParams = {
        apiKey,
        query: searchTerm,
        number: "10",
        offset: String(page * 10),
    }
    url.search = new URLSearchParams(queryParams).toString();
    try {
        const serachRes = await fetch(url);
        const resultJson = await serachRes.json();
        return resultJson;
    } catch (error) {
        console.log(error);
    }
};

export const getRecipeSummary = async (recipeId: string) => {
    if(!apiKey){
        throw new Error("API KEY not found")
    }
    const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`);
    const params = {
        apiKey: apiKey,
    }
    url.search = new URLSearchParams(params).toString();

    const searchRes = await fetch(url);
    const json = searchRes.json();
    return json;
}

export const getFavouriteRecipeByIDs = async(ids: string[])=>{
    if(!apiKey){
        throw new Error("API KEY not found")
    }
    const url = new URL(`https://api.spoonacular.com/recipes/informationBulk`);
    const params = {
        apiKey: apiKey,
        ids: ids.join(",")
    }

    url.search = new URLSearchParams(params).toString();
    const searchRes = await fetch(url);
    const json  = await searchRes.json();
    return{results: json};
}