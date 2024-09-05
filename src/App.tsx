import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'

function App() {
  return (
    <>
      <h1>Books Books be like Books when</h1>
      <input id="email" type="text" placeholder="Email"/>
      <input id="password" type="text" placeholder="Password"/>
      <button id="signup">Sign up</button>
      <button>Log in</button>
      <Listings/>
    </>
  )
}

export default App

const supabaseUrl = 'https://xznjhzoxaaxeldtfyebs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6bmpoem94YWF4ZWxkdGZ5ZWJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzOTA2MTQsImV4cCI6MjA0MDk2NjYxNH0.BvehGz2cFCFI7gk9uDfMlkVV5ftc-eu62Yb94yh1qb0'
const supabaseClient = createClient(supabaseUrl, supabaseKey)

async function fetchListings() {
  const listingsRes = await supabaseClient
  .from("listings")
  .select()
  console.log(listingsRes['data'])
  return listingsRes['data']
}
let listingsData = await fetchListings()

function Listings() {
  let [ listings, setListings ] = useState<any[]>(listingsData ? listingsData : [])
  if (listings.length === 0) {
    setListings(() => listingsData ? listingsData : [])
  }
  return(
    <div id="listings">
      {listings.map((listing) => (
        // TODO: create unique listing identifier column for key
        <div className="listing" key={listing['title']}>
          <h3>{listing['title']}</h3>
          <p>{listing['price']}</p>
        </div>
      ))}
    </div>
  )
}
/*
const emailInput = document.querySelector('#email')
const pwdInput = document.querySelector('#password')
async function signUp() {
    const { data, error } = await supabase.auth.signUp({
        email: emailInput.value,
        password: pwdInput.value,
    })
}
async function signIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput.value,
        password: pwdInput.value,
    })
}

const signUpBtn = document.querySelector('#signup')
signUpBtn.onclick = signUp*/