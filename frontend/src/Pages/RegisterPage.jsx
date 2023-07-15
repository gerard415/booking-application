import { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/auth/register', {
                name,
                email,
                password
            })
        } catch (error) {
            return error
        }
        
    }

    return(
        <div className="mt-8 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={(e) => handleSubmit(e)}>
                    <input 
                        type="text" 
                        placeholder="John Doe"
                        name='firstname'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="your@email.com"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="password"
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a Member? <Link className="underline text-black" to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}