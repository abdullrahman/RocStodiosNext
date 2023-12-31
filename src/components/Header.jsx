import { Fragment, useState } from 'react'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'

import { useLogout } from '@/hooks/useLogout'
import { useAuthContext } from '@/hooks/useAuthContext'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'

function MobileNavLink({ href, children }) {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  )
}

function MobileNavIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0'
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0'
        )}
      />
    </svg>
  )
}

function MobileNavigation() {
  const { logout } = useLogout()
  const { user, authIsReady } = useAuthContext()
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {authIsReady && (
            <Popover.Panel
              as="div"
              className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
            >
              <MobileNavLink href="/">Home</MobileNavLink>
              <MobileNavLink href="/Portfolio">Portfolio</MobileNavLink>
              <hr className="m-2 border-slate-300/40" />
              {!user && <MobileNavLink href="/login">Sign in</MobileNavLink>}
              <MobileNavLink href="/register">Sign up</MobileNavLink>
              {user && (
                <Button onClick={logout} color="blue">
                  <span>
                    Logout <span className="hidden lg:inline"></span>
                  </span>
                </Button>
              )}
            </Popover.Panel>
          )}
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

export function Header() {
  const { logout } = useLogout()
  const { user, authIsReady } = useAuthContext()
  return (
    <header className="py-10">
      {authIsReady && (
        <Container>
          <nav className="relative z-50 flex justify-between ">
            <div className="flex items-center md:gap-x-12">
              <Link href="/" aria-label="Home">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/rocstodios.appspot.com/o/images%2FMy%20project%20Logo.png?alt=media&token=94857d39-c901-47df-9efe-b4c46cc3ec06"
                  className="mx-auto h-20 w-auto"
                />
                {/* <Logo className="h-10 w-auto" /> */}
              </Link>
              <div className="hidden md:flex md:gap-x-6">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/Portfolio">Portfolio</NavLink>
              </div>
            </div>
            <div className="flex items-center gap-x-5 md:gap-x-8">
              {!user && (
                <div className="hidden md:block">
                  <NavLink href="/login">Sign in</NavLink>
                </div>
              )}
              <div className="hidden md:block">
                <NavLink href="/register">Sign up</NavLink>
              </div>
              {user && (
                <div className="hidden md:block">
                  <Button onClick={logout} color="blue">
                    <span>
                      Logout <span className="hidden lg:inline"></span>
                    </span>
                  </Button>
                </div>
              )}

              <div className="-mr-1 md:hidden">
                <MobileNavigation />
              </div>
            </div>
          </nav>
        </Container>
      )}
    </header>
  )
}
