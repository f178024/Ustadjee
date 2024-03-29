import { useState } from "react"
import Link from "next/link";
import axios from 'axios'
import {toast} from 'react-toastify'
var Inputmask = require('inputmask'); 

export default function signup() {
  const [CNIC, setCNIC] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('')

  function handleSignup(e) {
    e.preventDefault()

    axios.post('/api/signup', {
      cnic: CNIC,
      email,
      password,
      phone,
      username,
      type
    }).then(result => {
      window.location.href = '/'
    }).catch(err => {
      toast.error(err.data)
    })
  }

  return (
    <div className="flex flex-col items-center pt-24">
      <h1>Create a New Account</h1>
      <form onSubmit={handleSignup} className="flex flex-col p-8 px-12 shadow sm:w-full">
        {/* <input type="number" id="cnic" name="cnic" id="" placeholder='_____-_______-_' onChange={e => setCNIC(e.target.value)} /> */}
        <input type="number" id="cnic" name="cnic" placeholder="CNIC" onInput={(e) => e.target.value = e.target.value.slice(0, 13)} onChange={e => setCNIC(e.target.value)} required />
        <input type="email" name="email" id="" placeholder="Email" onChange={e => setEmail(e.target.value)} required/>
        {/* <input type="text" name="phone" id="" placeholder="Phone Number" maxLength="11" onChange={e => setPhone(e.target.value)} required /> */}
        <input type="number" placeholder="Phone Number" onInput={(e) => e.target.value = e.target.value.slice(0, 11)} onChange={e => setPhone(e.target.value)} required />
        <input type="username" name="password" id="" placeholder="Username" onChange={e => setUsername(e.target.value)} required/>
        <input type="password" name="password" id="" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
        <input type="password" name="password" id="" placeholder="Re-enter Password" />
        <label htmlFor="dob">Date of Birth</label>
        <input type="date" name="dob" id="dob" />
        <select onChange={e => setType(e.target.value)}>
          <option value="" selected disabled>Account Type</option>
          <option value="Student" >Student</option>
          <option value="Teacher" >Teacher</option>
          <option value="Parent">Parent</option>
        </select>
        <div className="flex justify-between pt-4">
          <input type="submit" value="Sign Up"  />
        </div>
      </form>
      <Link href="/signin">
        <a className="pt-4">Already have an account? <b>Sign In</b>.</a>
      </Link>

    </div>
  )
}