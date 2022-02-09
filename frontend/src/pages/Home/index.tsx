import api from "../../services/api";
import { useState, useEffect } from "react";

import Header from "../../components/index";

import "./home.scss";

interface IUser {
  name: string;
  username: string;
  email: string;
  _id: string;
  image?: string;
  [key: string]: any;
}

export default function Home() {
  const [user, setUser] = useState({} as IUser);

  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api
      .get("/users/checkuser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)} `,
        },
      })
      .then((response) => {
        setUser(response.data);
        console.log(response.data)
      });
  }, [token]);
  return (
    <div>
      <Header
        avatar={`${process.env.REACT_APP_API}/images/users/${user.image}`}
      />
      <section className="container_home">
        <h1>Home</h1>
      </section>
    </div>
  );
}
