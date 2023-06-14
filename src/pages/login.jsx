import Head from 'next/head'
import Link from 'next/link'

import { useRouter } from 'next/router'
import { useState } from 'react'
import { useLogin } from '@/hooks/useLogin'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'

export default function Login() {
  const { error, login } = useLogin()
  const router = useRouter()

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const handelSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    router.push({
      pathname: '/',
    })
  }
  return (
    <>
      <Head>
        <title>Sign In - TaxPal</title>
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
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Don’t have an account?{' '}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up
              </Link>{' '}
              for a free trial.
            </p>
          </div>
        </div>
        <form
          onSubmit={handelSubmit}
          className="mt-10 grid grid-cols-1 gap-y-8"
        >
          <TextField
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
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <div>
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Sign in <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
          {error && <p className=" font-semibold text-red-700">{error}</p>}
        </form>
      </AuthLayout>
    </>
  )
}
