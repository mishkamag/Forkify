import uniqid from "uniqid";

export default class List {
  constructor() {
    this.list = [];
  }

  addItems(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count, // თუ არ დავუწერ არაფერს ნიშნას ქეი და ვალიუ არის count
      unit,
      ingredient,
    };
    this.list.push(item);

    return item;
  }

  deleteItem(id) {
    const index = this.list.findIndex((el) => el.id === id);
    //[3,5,7] splice(1,2) --> return [5,7], original [3] საიდან დაიწყოს და რამდენი + ორიგნალს უკეთებს მუტაციას
    //[3,5,7] slice (1,2) -- > return 5, original [3,5,7] საიდან დაიწყო და სად დაამთავროს (არგუმენტები) აბრუნებს რაც დარჩა + ორიგინალს არ ცვლის
    this.list.splice(index, 1);
  }

  updateItem(id, newCount) {
    this.list.find((el) => el.id === id).count = newCount;
  }
}
