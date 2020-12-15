import axios from 'axios'
import {useRouter}from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify';

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  function handleLogin(){
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
      <h1>Sign in to Ustadjee</h1>
      <div className="flex flex-col p-12 shadow md:w-10/12">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="" onChange={e => setEmail(e.target.value)}/>
        <label htmlFor="password" >Password</label>
        <input type="password" name="password" id=""onChange={e => setPassword(e.target.value)}/>
        <div className="flex justify-between">
          <a href="">Forgot Password?</a>
          <input type="button" value="Sign In" className="ml-32" onClick={handleLogin}/>
        </div>
      </div>
      
    </div>
  )
}