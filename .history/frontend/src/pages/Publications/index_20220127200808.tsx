import Header from "../../components/index";

import "./home.scss";

export default function Publication() {
  function handleChange() {}

  function handleSubmit() {}

  return (
    <div>
      <Header />
      <section className="container_home">
        <h1>Publicação</h1>

        <div>
          

        <form onSubmit={handleSubmit}>
          <input type="file" name="image" onChange={handleChange} />
          <input type="text" name="legenda" onChange={handleChange} />
          <button type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
}
