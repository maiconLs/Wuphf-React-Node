import api from "./api"

export class UserService {
  
  static getUserSuggestions = async (token: string) => {
    const response = api
      .get(`/users/suggestions`, {
        headers: {
          Authorization: `Baerer ${JSON.parse(token)}`,
        },
      })
      .then((response) => response.data);
    return response;
  }
}