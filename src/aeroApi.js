export class AeroApi {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  get(date) {
    return fetch(`${this.apiUrl}${date}`).then(response) => {
      if (response.ok) {
        return response.json();
      }
      return null;
    }

  }
}
