import { useState } from "react"
import axios from 'axios'
import {toast} from 'react-toastify'

export default function signup() {
  const [CNIC, setCNIC] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSingup() {
    axios.post('/api/signup', {
      cnic: CNIC,
      email,
      password,
      phone,
      username
    }).then(result => {
      window.location.href = '/'
    }).catch(err => {
      toast.error(err.data)
    })
  }

  return (
    <div className="flex flex-col items-center pt-24">
      <h1>Create a new account</h1>
      <div className="flex flex-col p-8 shadow sm:w-full">
        <input type="text" name="cnic" id="" placeholder="CNIC" onChange={e => setCNIC(e.target.value)} />
        <input type="email" name="email" id="" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="text" name="phone" id="" placeholder="Phone Number" onChange={e => setPhone(e.target.value)} />
        <input type="username" name="password" id="" placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input type="password" name="password" id="" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <input type="password" name="password" id="" placeholder="Re-enter Password" />
        <label htmlFor="">Date of Birth</label>
        <div className="flex flex-row">
          <select>
            <option value="" selected disabled>Day</option>
          </select>
          <select>
            <option value="" selected disabled>Month</option>
          </select>
          <select>
            <option value="" selected disabled>Year</option>
          </select>
        </div>
        <select>
          <option value="" selected disabled>Account Type</option>
          <option value="">Student</option>
          <option value="">Teacher</option>
          <option value="">Parent</option>
        </select>
        <div className="flex justify-between">
          <a href="" className="pr-8">Forgot Password?</a>
          <input type="button" value="Sign Up" onClick={handleSingup} />
        </div>
      </div>
      <a href="/signin" className="pt-4">Already have an account? Sing in</a>
    </div>
  )
}