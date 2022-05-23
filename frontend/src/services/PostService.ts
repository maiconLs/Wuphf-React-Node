import api from "./api"

export class PostService {
  
  static getPostById = async (token: string, postId: string) => {
    const response = api
      .get(`/posts/postById/${postId}`, {
        headers: {
          Authorization: `Baerer ${JSON.parse(token)}`,
        },
      })
      .then((response) => response.data);
    return response;
  }
}