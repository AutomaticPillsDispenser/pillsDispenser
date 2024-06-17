// customProvider.js
import { signIn } from 'next-auth/react'

export default async function customProvider(credentials) {
  try {
    const response = await fetch('http:localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })

    if (response.ok) {
      const user = await response.json()
      signIn('email', { email: user.email })
    } else {
      // Handle authentication failure
      console.error('Authentication failed')
    }
  } catch (error) {
    // Handle network error
    console.error('Error:', error)
  }
}
