import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { Icons } from '../Icon/Icon'
import { Link } from 'react-router-dom'
import { authConfig } from '../../config/auth'
import useAuth from '../../hooks/useAuth'
import MyAccount from '../MyAccount/MyAccount'
import { buttonVariants } from '../ui/button'
import { cn } from '../../lib/utils'


const NavBar = () => {
    const auth=useAuth()
    const user= auth?.user || null
  return (
    <div className='bg-white sticky top-0 inset-x-0 z-50 h-16'>
        <header className='relative bg-white'>
            <MaxWidthWrapper className='fixed-error'>
                <div className='border-b border-gray-200'>
                    <div className='flex items-center h-16'>
                        <div className='flex ml-4 lg:ml-0'>
                            <Link to={'/'}>
                                <Icons.logo className='w-10 h-10'></Icons.logo>
                            </Link>
                        </div>
                        <div className='ml-auto flex items-center'>
                            <div className='lg:flex lg:flex-1 lg:items-center lg:justify-center lg:space-x-4 flex text-xs'>
                                {
                                    user ? <div>
                                        <MyAccount />
                                    </div> : <Link to={'/sign-in'} className={cn(buttonVariants({variant:'ghost'}),'text-xs md:text-base capitalize')}>
                                        Sign In
                                    </Link>
                                }
                                {
                                    user ? null : <span className='w-px md:h-6 bg-gray-200' aria-hidden='true' />
                                }
                                {
                                    user ? <div></div> : <Link to={'/sign-up'} className={cn(buttonVariants({variant:'ghost'}),'text-xs md:text-base capitalize')}>
                                        create an account
                                    </Link>
                                }
                                {
                                    user ? null : <span className='w-px h-6 bg-gray-200' aria-hidden='true' />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </header>
    </div>
  )
}

export default NavBar