const { createClient } = supabase

const supabaseUrl = 'https://xznjhzoxaaxeldtfyebs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6bmpoem94YWF4ZWxkdGZ5ZWJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzOTA2MTQsImV4cCI6MjA0MDk2NjYxNH0.BvehGz2cFCFI7gk9uDfMlkVV5ftc-eu62Yb94yh1qb0'
const supabaseClient = createClient(supabaseUrl, supabaseKey)

const listingsRes = await supabaseClient
.from("listings")
.select()
const listings = listingsRes['data']
console.log(listings)

const listingsElem = document.querySelector('#listings')
for (const listing of listings) {
    listingsElem.innerHTML += `<div class="listing">
    <h3>${listing['title']}</h3>
    <p>${listing['price']}</p>
    </div>`
}