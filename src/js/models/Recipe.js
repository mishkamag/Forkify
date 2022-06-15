import axios from "axios";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      alert(error);
    }
  }

  parseIngredients() {
    const newIngredients = this.ingredients.map((el) => {
      const unitsLong = [
        "tablespoons",
        "tablespoon",
        "ounces",
        "ounce",
        "teaspoons",
        "teaspoon",
        "cups",
      ];
      const unitsShort = ["tbsp", "tbsp", "oz", "oz", "tsp", "tsp", "cup"];

      const units = [...unitsShort, "g", "kg", "pound"];

      //uniform units (აბრევიატურებით შეცვლა ზედა ერეის წევრებისთვის)
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, index) => {
        ingredient = ingredient.replace(unit, unitsShort[index]);
      });

      //ფრჩხილების ამოშლა
      ingredient = ingredient.replace(/ *\(([^)]*)\) */g, " ");

      //სტრინგის დაკონვერტება ობჯექტად
      const ingArr = ingredient.split(" ");
      const unitIndex = ingArr.findIndex((word) => units.includes(word));

      let objIng = {
        count: "",
        unit: "",
        ingArr: "",
      };
      if (unitIndex > -1) {
        const arrCount = ingArr.slice(0, unitIndex);

        let count;
        if (arrCount.length === 1) {
          count = eval(arrCount[0]);
        } else {
          count = eval(arrCount.join("+"));
        }
        objIng = {
          count, //count რადგან არის პროფერთიც და ვალიუც
          unit: ingArr[unitIndex],
          ingredient: ingArr.slice(unitIndex + 1).join(" "),
        };
      } else if (+ingArr[0]) {
        objIng = {
          count: +ingArr[0],
          unit: "",
          ingredient: ingArr.slice(1).join(" "),
        };
      } else if (unitIndex === -1) {
        objIng = {
          count: 1,
          unit: "",
          ingredient,
        };
      }

      return objIng;
    });
    this.ingredients = newIngredients;
  }

  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  updateServingIngredient(type) {
    const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;
    this.ingredients.forEach((el) => {
      el.count = el.count * (newServings / this.servings);
    });

    this.servings = newServings;
  }
}
