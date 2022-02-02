import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/index";

import "./home.scss";

export default function Publication() {
  const [post, setPost] = useState('')

  const [token] = useState(localStorage.getItem('token') || '')
  const navigate = useNavigate()

  async function handleSubmit(pet) {

    const formData = new FormData()

    const petFormData = await Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append(`images`, pet[key][i])
        }
      } else {
        formData.append(key, pet[key])
      }
    })

    formData.append('pet', petFormData)

    await api
      .post(`pets/create`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        navigate('/pet/mypets')
        toast.success("Pet cadastrado com sucesso")
        return response.data
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response.data.message))
        return err.response.data
      })

  }

  return (
    <div>
      <Header />
      <section className="container_home">
        <h1>Publicação</h1>

        <form onSubmit={handleSubmit}>
          <input type="file" name="image" onChange={onFileChange} />
          <input
            type="text"
            name="legenda"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
}
