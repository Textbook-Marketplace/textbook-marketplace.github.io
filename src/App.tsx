import { useEffect, useState } from 'react'
import { createClient, Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import './App.css'

let loginAttempt: boolean = false


function App() {
const [update, forceUpdate] = useState<boolean>(false)
// Auth session
const [session, setSession] = useState<Session | null>(null)

useEffect(() => {
  supabaseClient.auth.getSession().then(({ data: { session } }) => {
    setSession(session)
  })

  const {
    data: { subscription },
  } = supabaseClient.auth.onAuthStateChange((_event, session) => {
    setSession(session!)
  })

  return () => subscription.unsubscribe()
}, [])
function triggerAuth(open: boolean) {
  console.log(session)
  console.log('trigger auth')
  loginAttempt = open
  forceUpdate(!update)
}
function logOut() {
  console.log("log out")
  supabaseClient.auth.signOut()
}

console.log(session)
if (loginAttempt && session == null) {
  return (
  <>
    <button onClick={() =>{triggerAuth(false)}}>Back</button>
    <Auth supabaseClient={supabaseClient} appearance={{ theme: ThemeSupa }} />
  </>
  )}
if(session != null) loginAttempt = false
return (
  <>
    <h1>Books Books be like Books when</h1>
    {session == null 
    ? <button onClick={() =>{triggerAuth(true)}}>Sign up / Log in</button>
    : <button onClick={() =>{logOut()}}>Log out</button>
  }
    <Listings/>
  </>
)
}

export default App

const supabaseUrl = 'https://xznjhzoxaaxeldtfyebs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6bmpoem94YWF4ZWxkdGZ5ZWJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzOTA2MTQsImV4cCI6MjA0MDk2NjYxNH0.BvehGz2cFCFI7gk9uDfMlkVV5ftc-eu62Yb94yh1qb0'
const supabaseClient = createClient(supabaseUrl, supabaseKey)

function Listings() {
  let [ listings, setListings ] = useState<any[]>([])
  async function fetchListings() {
    const listingsRes = await supabaseClient
    .from("listings")
    .select()
    console.log(listingsRes['data'])
    setListings(listingsRes['data']!)
  }
  useEffect(() => {
    fetchListings();
  }, []);
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