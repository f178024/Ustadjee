import axios from 'axios'
import {useRouter}from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify';

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  function handleLogin(e){
    e.preventDefault()

    axios.post('/api/login', {email, password}).then(result => {
      let data = result.data

      if(!data.err){
        router.push('/')
      } else {
        toast.error('Invalid Username/Password')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="flex flex-col items-center pt-24">
      <h1>Sign In to UstaadJee</h1>
      <form onSubmit={handleLogin} className="flex flex-col p-12 shadow md:w-10/12">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="" onChange={e => setEmail(e.target.value)} required/>
        <label htmlFor="password" >Password</label>
        <input type="password" name="password" id="" onChange={e => setPassword(e.target.value)} minLength="6" required/>
        <div className="flex justify-between">
          <a href="">Forgot Password?</a>
          <input type="submit" value="Sign In" className="ml-32" />
        </div>

      </form>
      <div className="pt-4">
        <Link href="/signup">
          <a>
            Don't have an Account? Click here to Sign Up.
          </a>
        </Link>
      </div>
    </div>
  )
}