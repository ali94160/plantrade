import { createContext, useContext, useState} from "react";

interface Props {
  children?: JSX.Element
}

type User = {
  username: string,
  email: string,
  password: string
}

export const AuthProvider: React.FC<Props> = ({children}) => {

  const AuthContext = createContext<any>(null);

  const [user, setUser] = useState({});
  

  const registerUser = async (user: User) => {
    let res = await fetch("/api/register", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    },
    )
    let newUser = await res.json();
    setUser(newUser);
    console.log(newUser , 'new User?')
    
  }

  const values = {
    registerUser
  }

  return (
    <AuthContext.Provider value={values}>
      { children }
    </AuthContext.Provider>
  );

}