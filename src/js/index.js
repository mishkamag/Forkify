// Global app controller
import Recipe from "./models/recipe";
import Search from "./models/Search";
import { clearLoader, elements, renderLoader } from "./views/base";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";

const state = {};
window.state = state;

const controlSearch = async () => {
  const query = searchView.getInput();
  if (query) {
    searchView.clearInput(); //წინასწარ უწერ ქლეარს რადგან თუ ქვემოთ გაუწერ სულ დააქლიერებს
    searchView.clearResults();
    renderLoader(elements.searchResList);

    state.search = new Search(query);
    await state.search.getResults();

    clearLoader();
    searchView.rederResult(state.search.result);
  }
};

//Recipe

const controlRecipe = async () => {
  const id = window.location.hash.replace("#", "");

  if (id) {
    //prepare UI
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    state.search && searchView.activeLinkStyle(id);

    // Create new Recipe object
    state.recipe = new Recipe(id);

    try {
      await state.recipe.getRecipe();
    } catch (error) {
      alert("Recipe error");
    }

    state.recipe.parseIngredients();

    //calculate time and service
    state.recipe.calcTime();
    state.recipe.calcServings();

    clearLoader();
    recipeView.renderRecipe(state.recipe);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const goToPage = +btn.dataset.goto;
    searchView.clearResults();
    searchView.rederResult(state.search.result, goToPage);
  }
});

window.addEventListener("hashchange", () => {
  controlRecipe();
});

window.addEventListener("load", () => {
  controlRecipe();
});
