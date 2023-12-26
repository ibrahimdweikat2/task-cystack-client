import React from 'react'
import { Icons } from '../components/Icon/Icon'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TSignInCredentialValidator, signInCredentialValidator } from '../lib/Valedator'
import { cn } from '../lib/utils'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { buttonVariants } from '../components/ui/button'

const SignIn = () => {
    const history=useNavigate()
    const auth=useAuth()
    const {register,handleSubmit,formState:{errors}}=useForm<TSignInCredentialValidator>({
        resolver:zodResolver(signInCredentialValidator)
    })

    const onSubmits=({email,password,rememberMe}:TSignInCredentialValidator)=>{
        const formData=new FormData()
        console.log(rememberMe)

        formData.append('email', email)
        formData.append('password', password)
        const stringRememberMe=rememberMe ? 'true' : 'false'

        auth.login(formData,(error:any)=>{
            toast.error(error?.response?.data?.message);
        },stringRememberMe)

        auth.loading === false && history('/')
    }
  return (
    <div className='container relative flex flex-col items-center justify-center pt-20 pb-10 lg:space-x-0'>
        <div className='flex flex-col justify-center w-full mx-auto sm:w-[350px] space-y-6'>
            <div className='flex flex-col items-center space-y-2'>
                <Icons.logo className='w-20 h-20'/>
                <h1 className='text-2xl font-bold'>Create An Account</h1>
                <Link to={'/sign-up'} className='gap-1.5 flex hover:text-blue-500 transition hover:underline'>
                    Don't Have An Account ? Sign Up
                    <ArrowRight />
                </Link>
            </div>
            <div className='grid gap-6'>
                <form onSubmit={handleSubmit(onSubmits)}>
                    <div className='grid gap-2'>
                        <div className="form-floating grid gap-1 py-2">
                            <input 
                                {...register('email')} 
                                type="email" 
                                className={cn('form-control',{
                                    "focus-visible:ring-red-500":errors.email
                                })} 
                                id="floatingInput" 
                                placeholder="name@example.com" 
                            />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating grid gap-1 py-2">
                            <input 
                                {...register('password')} 
                                type="password" 
                                className={cn('form-control',{
                                    "focus-visible:ring-red-500":errors.password
                                })}
                                id="floatingPassword" 
                                placeholder="Password" 
                            />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className='flex items-center gap-2 py-2'>
                            <input 
                                type='checkbox'
                                className='w-4 h-4'
                                {...register('rememberMe')}
                            />
                            <label htmlFor="rememberMe">Remember Me</label>
                        </div>
                    </div>
                    <button className={cn(buttonVariants({variant:'default'}),'py-2 mt-2 w-full')}>Sign In</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignIn