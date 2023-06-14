import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useSignup } from '@/hooks/useSignup'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useRouter } from 'next/router'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'

export default function Register() {
  const router = useRouter()
  const { user, authIsReady } = useAuthContext()
  if (authIsReady) {
    !user ? router.push({ pathname: '/login' }) : null
  }
  const { error, signup } = useSignup()

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const handelSubmit = (e) => {
    e.preventDefault()
    signup(email, password)
    router.push({
      pathname: '/login',
    })
  }
  return (
    <>
      <Head>
        <title>Sign Up - TaxPal</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/rocstodios.appspot.com/o/images%2FMy%20project%20Logo.png?alt=media&token=94857d39-c901-47df-9efe-b4c46cc3ec06"
              className="mx-auto h-20 w-auto"
            />
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Get started for free
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Already registered?{' '}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign in
              </Link>{' '}
              to your account.
            </p>
          </div>
        </div>
        <form
          action="#"
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
          onSubmit={handelSubmit}
        >
          <TextField
            className="col-span-full"
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <TextField
            className="col-span-full"
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />

          <div className="col-span-full">
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Sign up <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
          {error && <p className=" font-semibold text-red-700">{error}</p>}
        </form>
      </AuthLayout>
    </>
  )
}
