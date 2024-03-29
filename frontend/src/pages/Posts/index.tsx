import api from "../../services/api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { FiUpload } from "react-icons/fi";

interface IPost {
  subtitle: string;
  _id: string;
  image: string;
  [key: string]: any;
}

interface IUser {
  name: string;
  username: string;
  email: string;
  _id: string;
  image?: string;
  [key: string]: any;
}

export default function Posts() {
  const [user, setUser] = useState({} as IUser);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([] as unknown as IPost);
  const [preview, setPreview] = useState([] as any);
  const [token] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/users/checkuser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)} `,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, [token]);

  function onFileChange(e: any) {
    setPreview(Array.from(e.target.files));
    setPost({ ...post, images: [...e.target.files] });
    console.log(Array.from(e.target.files))
  }

  function handleChange(e: any) {
    setPost({ ...post, [e.target.name]: e.target.value });
    console.log(post);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData();

    const postFormData = Object.keys(post).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < post[key].length; i++) {
          formData.append(`images`, post[key][i]);
        }
      } else {
        formData.append(key, post[key]);
      }
    });

    formData.append("posts", JSON.stringify(postFormData));

    await api
      .post(`/posts/createpost`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        navigate("/");
        toast.success("Post cadastrado com sucesso");
        console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response.data.message));
        return err.response.data;
      });
  }

  return (
    <div>
      
      <section className="container_home">
        <h1>Publicação</h1>
        <div>
          <div>
            {preview.length > 0
              ? preview.map((image: Blob | MediaSource, index: any) => (
                  <img
                    src={URL.createObjectURL(image)}
                    alt={post.name}
                    key={`${post.name}+${index}`}
                  />
                ))
              : post.images &&
                post.images.map((image: any, index: any) => (
                  <img
                    src={`${process.env.REACT_APP_API}/images/posts/${image}`}
                    alt={post.name}
                    key={`${post._id}+${index}`}
                  />
                ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <input type="file" name="images" multiple onChange={onFileChange} />
          <input type="text" name="subtitle" onChange={handleChange} />
          <button type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
}
