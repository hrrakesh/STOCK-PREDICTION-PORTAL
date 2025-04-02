import {useState, useContext, createContext} from 'react'


const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem('accessToken') // to check for true or false
    )
  return (
    <AuthContext value={{isLoggedIn, setIsLoggedIn}} >
        {children}
    </AuthContext>
  )
}

export default AuthProvider
export {AuthContext}