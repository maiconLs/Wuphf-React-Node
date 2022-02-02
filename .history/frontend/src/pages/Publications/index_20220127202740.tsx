import { useState } from "react";
import Header from "../../components/index";

import "./home.scss";

export default function Publication() {
  const [post, setPost] = useState('');

  function handleSubmit() {}

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
