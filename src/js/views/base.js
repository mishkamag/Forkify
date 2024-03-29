export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchResList: document.querySelector(".results__list"),
  searchResPages: document.querySelector(".results__pages"),
  recipe: document.querySelector(".recipe"),
  shoping: document.querySelector(".shopping__list"),
  likesList: document.querySelector(".likes__list"),
  likeMenu: document.querySelector(".likes__field"),
};

export const renderLoader = (parent) => {
  //სერჩის დროს ძებნის ტრიალი
  const loader = `
      <div class = "loader">
          <svg>
              <use href = "img/icons.svg#icon-cw"></use>
          </svg>
      </div>`;
  parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
  //ძებნის ტრიალის წაშლა დატას მიღებისთანავე
  const loader = document.querySelector(".loader");
  loader && loader.parentElement.removeChild(loader);
};
