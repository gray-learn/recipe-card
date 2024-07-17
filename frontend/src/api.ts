export const searchRecipes = async(searchTerm: string, page: number) =>{
    const baseUrl = new URL("http://localhost:5000/api/recipes/search");
    baseUrl.searchParams.append("searchTerm", searchTerm)
    baseUrl.searchParams.append("page", String(page))

    const res = await fetch(baseUrl)
    if(!res.ok){
        throw new Error(`HTTP Error Status: ${res.status}`)
    }

    return res.json();

}

export const getRecipeSummary =async (recipeId: string) =>{
    const url = new URL(`http://localhost:5000/api/recipes/${recipeId}/summary`);
    const res = await fetch(url);
    if(!res.ok){
        throw new Error(`HTTP Error Status: ${res.status}`)
    }
    return res.json();
}