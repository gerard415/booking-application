import {createContext, useEffect, useState} from 'react'
import axios from 'axios'

export const UserContext  = createContext({})

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(null)

    useEffect(() => {
        if(!user){
            const getProfile = async () => {
                try {
                    const {data} = await axios.get('/auth/profile')
                    setUser(data)
                    setReady(true)
                } catch (error) {
                    return error
                }
                  
            }
            getProfile()
        }
        
    },[])
    console.log(user, ready)
    return(
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    )
}