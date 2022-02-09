import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import Header from "../../components/index";

import avatar from "../../assets/avatar.png";

import "./profile.scss";

interface IUser {
  name: string;
  username: string;
  email: string;
  _id: string;
  image?: string;
}

interface IPost {
  map(arg0: (post: string[]) => void): import("react").ReactNode;
  length: number;
  subtitle: string[];
  comments: string[];
  _id: string;
  image: string[];
}

export default function Profile(): JSX.Element {
  const [user, setUser] = useState({} as IUser);
  const [posts, setPosts] = useState([] as unknown as IPost);
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api
      .get("/users/checkuser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        console.log(response.data)
      });
  }, [token]);

  useEffect(() => {
    api.get("/publications/mypublications", {
      headers: {
        Authorization: `Baerer ${JSON.parse(token)}`
      },
    })
      .then((response) => {
      setPosts(response.data)
      console.log(response.data)

    })
  }, [token])

  return (
    <div>
      <Header
        avatar={`${process.env.REACT_APP_API}/images/users/${user.image}`}
      />
      <section className="container_profile">
        <div className="header_profile">
          <div className="avatar">
            <img
              src={
                user.image
                  ? `${process.env.REACT_APP_API}/images/users/${user.image}`
                  : avatar
              }
              alt="avatar"
            />
          </div>
          <section>
            <div className="row1">
              <h2>{user.username}</h2>
              <button>
                <Link to="/edit">Editar perfil</Link>
              </button>
            </div>

            <div className="row2">
              <ul>
                <li>Publicações</li>
                <li>
                  <Link to="/profile/followers">Seguidores</Link>
                </li>
                <li>
                  <Link to="/profile/following">A seguir</Link>
                </li>
              </ul>
            </div>

            <div className="row3">
              <h1>{user.name}</h1>
            </div>
          </section>
        </div>

        <hr/>

        <article>
          <div className="posts">
            {posts.length > 0 &&
              // eslint-disable-next-line array-callback-return
              posts.map((post: string[]) => {
                <div key={posts._id}>
                  <img src={`${process.env.REACT_APP_API}/images/posts/${posts.image[0]}`} alt="publicação do usuário"/>
                </div>
              })
            }
          </div>
        </article>
      </section>
    </div>
  );
}
