
import './App.css'
import { useState } from 'react'
import {
  SignInButton,
  SignedOut,
  SignedIn,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Welcome to My App </h1>

      <SignedOut>
        <SignInButton mode="modal"> 
        </SignInButton>
        <button className="dnadaidia">Sign up please</button>
      </SignedOut>
      
      <SignedIn>
        <SignOutButton />
        <UserButton />
      </SignedIn>
    </> 
  )
}

export default App
