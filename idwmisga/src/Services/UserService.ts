   export class UserService {
  BaseUrl = "https://jsonplaceholder.typicode.com/";

  getusers() {
    return fetch(this.BaseUrl + "users")
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }
}

export default new UserService();
