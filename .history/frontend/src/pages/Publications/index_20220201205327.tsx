import api from "../../services/api";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/index";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { FiUpload } from "react-icons/fi";

interface IPost {
  subtitle: string;
  _id: string;
  image: string;
  [key: string]: any;
}

export default function Publication() {
  const [post, setPost] = useState({} as IPost)
  const [preview, setPreview] = useState([] as any)
  const [token] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  function onFileChange(e: any) {
    setPreview(Array.from(e.target.files))
    setPost({ ...post, images: [...e.target.files] })
  }

  function handleChange(e: any) {
    setPost({ ...post, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: any) {
    e.preventDefaukt
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

    formData.append("post", JSON.stringify(postFormData) );

    await api
      .post(`/publications/createpublication`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        navigate("/home");
        toast.success("Post cadastrado com sucesso");
        return response.data;
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response.data.message));
        return err.response.data;
      });
  }

  return (
    <div>
      <Header />
      <section className="container_home">
        <h1>Publicação</h1>
        <div>
            {post.image || preview ? (
              <img
                src={
                  preview
                    ? URL.createObjectURL(preview)
                    : `${process.env.REACT_APP_API}/images/users/${post.image}`
                }
                alt={post.name}
              />
            ) : (
              <span>
              <FiUpload color="#FFF" size={25} />
            </span>
            )}
          </div>

        <form onSubmit={handleSubmit}>
          <input type="file" name="image" onChange={onFileChange} />
          <input
            type="text"
            name="legenda"
            onChange={handleChange}
          />
          <button type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
}
