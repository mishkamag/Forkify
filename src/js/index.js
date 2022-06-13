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
    state.recipe = new Recipe(id);
    await state.recipe.getRecipe();
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
