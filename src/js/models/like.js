export default class Like {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };

    this.likes.push(like);

    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex((el) => el.id === id);

    this.persistData();

    this.likes.splice(index, 1); //ორიგინალ მასივშივე მუტაცია
  }

  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }

  persistData() {
    localStorage.setItem("likse", JSON.stringify(this.likes));
  }
}
