import api from "../../services/api";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/index";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import "./home.scss";

export default function Publication() {
  const [token] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  async function handleSubmit(pet) {
    const formData = new FormData();

    const petFormData = Object.keys(pet).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append(`images`, pet[key][i]);
        }
      } else {
        formData.append(key, pet[key]);
      }
    });

    formData.append("pet", petFormData);

    await api
      .post(`pets/create`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        navigate("/pet/mypets");
        toast.success("Pet cadastrado com sucesso");
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

        <form onSubmit={handleSubmit}>
          <Input
          text="Imagens do Pet"
          type="file"
          name="images"
          handleOnChange={onFileChange}
          multiple={true}
        />
        <Input
          text="Nome do Pet"
          type="text"
          name="name"
          placeholder="Digite o nome"
          handleOnChange={handleChange}
          value={pet.name || ''}
        />
          <button type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
}
