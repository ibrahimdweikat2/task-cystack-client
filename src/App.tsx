import React, { useEffect, useRef } from 'react';
import MaxWidthWrapper from './components/MaxWidthWrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { TSearchCredentialValidator, searchCredentialValidator } from './lib/Valedator';
import { cn } from './lib/utils';
import useAuth from './hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch,useSelector } from './lib/redux';
import { filterCertificates, getAllCertificatesByUserId, getCertificateBySearch, storageAllCertificates } from './lib/redux/slice/certificates/thunk';
import { certificateSelector } from './lib/redux';
import Spinner from './components/Spinner/Spinner';
import { buttonVariants } from './components/ui/button';

import { DataTableDemo } from './components/DataTable/DataTable';

function App() {
  const {certificate,status,error,statusStorage}=useSelector(certificateSelector)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const auth=useAuth()
  const user= auth?.user || null
  const {register,handleSubmit,formState:{errors},getValues,setValue} =useForm<TSearchCredentialValidator>({
    resolver:zodResolver(searchCredentialValidator)
  });
  console.log(certificate)

  const onSubmits=({search}:TSearchCredentialValidator)=>{
      dispatch(
        getCertificateBySearch(search)
      )
    
  }
  

  const storageCertificates=()=>{
    const domain=getValues('search');
    if(user === null){
      toast.error("You Must be logged in")
      navigate('/sign-in')
    }else if(domain?.length > 0 && user !== null && certificate.length > 0){
      dispatch(
        storageAllCertificates({certificate,userId:user?.id,domain})
      )
    }else{
      toast.error("Domain Not Found Or User Not Found Or Certificate Not Found",{
        position:'bottom-right'
      })
    }
  }

  useEffect(()=>{
    if(user !== null){
      dispatch(
        getAllCertificatesByUserId({userId:user?.id})
      )
    }
  },[dispatch,user])

  return (
    <div>
      <MaxWidthWrapper className='mt-10 sm:mt-auto'>
        <div className='bg-white relative flex flex-col gap-2 space-y-6'>
          <div className='form-floating flex items-center mx-auto gap-4'>
            <div className='flex flex-col gap-3'>
              <form className="flex flex-col md:flex-row w-full gap-2" role="search" onSubmit={handleSubmit(onSubmits)}>
                <input {...register('search')} className={cn('form-control me-2 sm:w-[500px] w-full',{
                  "focus-visible:ring-red-500":errors.search
                })} type="search" placeholder="Search" aria-label="Search" />
                <button className={cn(buttonVariants({variant:'default'}),'px-4')} type="submit">Search</button>
              </form>
              <div className='flex flex-col md:flex-row md:items-center md:mx-auto gap-1.5'>
                <button className={buttonVariants({variant:'default'})} onClick={()=>dispatch(filterCertificates(certificate))}>Filter Expired Certificates</button>
                <button className={buttonVariants({variant:'default'})} onClick={storageCertificates}>{statusStorage === 'pending' ? <Spinner className='flex items-center mx-auto px-5'/>:'Save Certificates'}</button>
              </div>
            </div>
          </div>
          {
            certificate.length > 0 && <DataTableDemo certificate={certificate} />
          }
          {
            status === 'pending' ? <Spinner  className='flex items-center mx-auto py-10 text-white'/> : null
          }
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default App;
