import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { buttonVariants } from '../ui/button'
import { cn } from '../../lib/utils'


const MyAccount = () => {
    const auth=useAuth()
  return (
    <div className="dropdown">
        <button className="btn hover:bg-gray-200 dropdown-toggle text-black" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            My Account
        </button>
        <ul className="dropdown-menu">
            <p className='text-center py-1'>Action</p>
            <span className='w-full h-[1px] bg-gray-200'/>
            <button className={cn(buttonVariants({variant:'ghost'}),'w-full text-muted-foreground')}>
              <Link to={'/user/settings'}>
                User Setting
              </Link>
            </button>
            <span className='w-full h-[1px] bg-gray-200'/>
            <button className={cn(buttonVariants({variant:'ghost'}),'w-full text-muted-foreground')} onClick={()=> auth.logout()}>Log Out</button>
        </ul>
    </div>

  )
}

export default MyAccount