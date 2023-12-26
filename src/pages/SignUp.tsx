import React from 'react'
import { Icons } from '../components/Icon/Icon'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TSignUpCredentialValidator, signUpCredentialValidator } from '../lib/Valedator'
import { cn } from '../lib/utils'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { buttonVariants } from '../components/ui/button'

const SignUp = () => {
    const history=useNavigate()
    const auth =useAuth()
    const {register,handleSubmit,formState:{errors}}=useForm<TSignUpCredentialValidator>({
        resolver:zodResolver(signUpCredentialValidator)
    })

    const onSubmits=({email,password,firstName,lastName}:TSignUpCredentialValidator)=>{
        const formData=new FormData();

        formData.append('email',email)
        formData.append('password',password)
        formData.append('name',`${firstName} ${lastName}`)

        auth.register(formData,(error:any)=>{
            toast.error(error?.response?.data?.message)
        })

        auth.loading === false && history('/sign-in')
    }
  return (
    <div className='container relative flex flex-col items-center justify-center pt-20 pb-10 lg:space-x-0'>
        <div className='flex flex-col justify-center w-full mx-auto sm:w-[350px] space-y-6'>
            <div className='flex flex-col items-center space-y-2'>
                <Icons.logo className='w-20 h-20'/>
                <h1 className='text-2xl font-bold'>Create An Account</h1>
                <Link to={'/sign-in'} className='gap-1.5 flex hover:text-blue-500 transition hover:underline'>
                    Already Have An Account
                    <ArrowRight />
                </Link>
            </div>
            <div className='grid gap-6'>
                <form onSubmit={handleSubmit(onSubmits)}>
                    <div className='grid gap-2'>
                        <div className="form-floating grid gap-1 py-2">
                            <input 
                                {...register('firstName')} 
                                type="text" 
                                className={cn('form-control',{
                                    "focus-visible:ring-red-500":errors.firstName
                                })} 
                                id="floatingInput" 
                                placeholder="First Name" 
                            />
                            <label htmlFor="floatingInput">First Name</label>
                        </div>
                        <div className="form-floating grid gap-1 py-2">
                            <input 
                                {...register('lastName')} 
                                type="text" 
                                className={cn('form-control',{
                                    "focus-visible:ring-red-500":errors.lastName
                                })}
                                id="floatingInput" 
                                placeholder="Last Name" 
                            />
                            <label htmlFor="floatingInput">Last Name</label>
                        </div>
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
                    </div>
                    <button className={cn(buttonVariants({variant:'default'}),'py-2 mt-2 w-full')}>Sign Up</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignUp