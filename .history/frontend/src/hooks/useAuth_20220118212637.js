import { useContext } from "react";
import { AuthContext } from "../";


export default function useAuth(){
  const value = useContext(AuthContext)
  return value;
}