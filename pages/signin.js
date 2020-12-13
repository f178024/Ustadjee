import axios from 'axios'
import Head from 'next/head'
import { useState } from 'react'
import config from '../next.config'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin(){
    axios.post('/api/login', {email, password}).then(result => {
      let data = result.data

      if(!data.err){
        window.location.href = '/'
      } else {

      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="flex flex-col items-center pt-24">
      <h1>Sign in to Ustadjee</h1>
      <div className="flex flex-col p-12 shadow md:max-w-md w-10/12">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="" onChange={e => setEmail(e.target.value)}/>
        <label htmlFor="password" >Password</label>
        <input type="password" name="password" id=""onChange={e => setPassword(e.target.value)}/>
        <div className="flex justify-between">
          <a href="">Forgot Password?</a>
          <input type="button" value="Sign In" onClick={handleLogin}/>
        </div>
      </div>
    </div>
  )
}