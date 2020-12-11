export default function signup() {
  return (
    <div className="flex flex-col items-center pt-24">
      <h1>Create a new account</h1>
      <form action="" className="flex flex-col p-8 shadow sm:w-full">
        <input type="number" name="email" id="" placeholder="CNIC" />
        <input type="email" name="email" id="" placeholder="Email" />
        <input type="username" name="password" id="" placeholder="Username" />
        <input type="password" name="password" id="" placeholder="Password" />
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
          <input type="submit" value="Sign Up" />
        </div>
      </form>
      <a href="/signin" className="pt-4">Already have an account? Sing in</a>
    </div>
  )
}