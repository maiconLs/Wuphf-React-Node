import Header from "../../components/index";

import "./home.scss";

export default function Publication() {

  function handleSubmit() {}

  return (
    <div>
      <Header />
      <section className="container_home">
        <h1>Publicação</h1>

        <div>
        {user.image || preview ? (
              <img
                src={
                  preview
                    ? URL.createObjectURL(preview)
                    : `${process.env.REACT_APP_API}/images/users/${user.image}`
                }
                alt={user.name}
              />
            ): (
              <img src={avatar} alt="Avatar" />
            )}
        </div>

        <form onSubmit={handleSubmit}>
          <input type="file" name="image" onChange={onFileChange} />
          <input type="text" name="legenda" onChange={() => setPost(e.target.value)} />
          <button type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
}
