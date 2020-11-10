import Head from 'next/head'
import config from '../next.config'

export default function Home() {
  return (
    <div className="flex flex-col items-center pt-24">
      <h1>Sign in to Ustadjee</h1>
      <form action="" className="flex flex-col p-12 shadow md:max-w-md w-10/12">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="" />
        <label htmlFor="password" >Password</label>
        <input type="password" name="password" id=""/>
        <div className="flex justify-between">
          <a href="">Forgot Password?</a>
          <input type="submit" value="Sign In" />
        </div>
      </form>
    </div>
  )
}