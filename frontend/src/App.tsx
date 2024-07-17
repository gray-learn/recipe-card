import React, { FormEvent, useRef, useState } from "react";
import "./App.css";
import * as api from "./api";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";

type Tabs = "search" | "favourite"; // assignable

function App() {
  const [searchTerm, setSearchTerm] = useState<string>(""); // anytime user change
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const pageNumber = useRef(1); // no need to rerender 1:22:10 (for performance)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );
  const [selectedTab, setSelectedTab] = useState<Tabs>("search");

  const handleSearchSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);
      pageNumber.current = 1;
    } catch (error) {
      console.log(e);
    }
  };

  const handleViewMoreClick = async () => {
    try {
      const nextPage = pageNumber.current + 1; // keep last recipe we fetch
      const nextRecipe = await api.searchRecipes(searchTerm, nextPage);
      // save to state
      setRecipes([...recipes, ...nextRecipe.results]); // ...recipes copy existing array
      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="tabs">
        <h3 onClick={() => setSelectedTab("search")}>Recipe Search</h3>
        <h3 onClick={() => setSelectedTab("favourite")}>Favourite</h3>
      </div>
      {selectedTab === "search" && (
        <>
          <form onSubmit={(e) => handleSearchSubmit(e)}>
            <input
              type="text"
              required
              placeholder="enter search term..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            <button type="submit">Submit</button>
          </form>

          {recipes.map((r) => (
            <RecipeCard recipe={r} onClick={() => setSelectedRecipe(r)} />
          ))}
          <button className="view-more-button" onClick={handleViewMoreClick}>
            View More
          </button>
        </>
      )}

      {selectedTab === "favourite" && (
        <>
          <div>This is favourite</div>
        </>
      )}

      {selectedRecipe ? (
        <RecipeModal
          recipeId={selectedRecipe.id.toString()}
          onClose={() => {
            setSelectedRecipe(undefined);
          }}
        />
      ) : null}
    </div>
  );
}

export default App;
