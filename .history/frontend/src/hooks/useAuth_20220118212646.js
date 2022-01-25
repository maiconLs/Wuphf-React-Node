import { useContext } from "react";
import { AuthContext } from "../contexts/";


export default function useAuth(){
  const value = useContext(AuthContext)
  return value;
}