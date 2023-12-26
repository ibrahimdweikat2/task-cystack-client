import { useForm } from "react-hook-form"
import { Icons } from "../components/Icon/Icon"
import { TUserSettingsValidator, UserSettingsValidator } from "../lib/Valedator"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "../lib/utils"
import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { baseAPI } from "../api"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner/Spinner"
import { Button, buttonVariants } from "../components/ui/button"
import { Textarea } from "../components/ui/TextEarea"
import { Checkbox } from "../components/ui/checkbos"
import { Input } from "../components/ui/input"


const Setting = () => {
  const [loading,setLoading]=useState<boolean>(false);
  const [isChecked,setIsChecker]=useState(0);
  const [textarea,setTextArea]=useState<string>('')
  const auth=useAuth()
  const {register,handleSubmit,formState:{errors},setValue}=useForm<TUserSettingsValidator>({
    resolver:zodResolver(UserSettingsValidator)
  })

  const onSubmits=async ({threshold,receive}:TUserSettingsValidator)=>{
    setLoading(true)
    const pattern = /^\d+$/;
    if(auth?.user?.theshold !== undefined){
      const userThreshold: number = parseInt(auth.user.theshold, 10);
      if(!isNaN(userThreshold)){
        if(userThreshold === parseInt(threshold,10)){
          toast.error("The Value Are The Same Please Change It To Update",{
            position:'bottom-right'
          })
        }else if(pattern.test(threshold)){
          
          let update:any={}
          if(isChecked && textarea?.length > 0 && textarea.split(',')){
            update={
              theshold:threshold,
              receive_notification:receive,
              receive_email:textarea
            }
            const response= await baseAPI.put(`/update_user_settings/${auth?.user?.id}`,update);
            if(response?.status === 200){
              toast.success(response?.data?.message,{
                position:'bottom-right'
              })
              auth.setUser({...auth?.user,theshold:threshold})
            }else if(response?.status === 404){
              toast.error(response?.data?.message,{
                position:'bottom-right'
              })
            }
          }else if((isChecked && !textarea.split(',') ) || (isChecked && textarea?.length === 0)){
            toast.error("The Value In Receive Email Must Be As name1@example.com,name2@example.com")
          }else{
            update={
              theshold:threshold,
              receive_notification:receive,
              receive_email:null
            }
            const response= await baseAPI.put(`/update_user_settings/${auth?.user?.id}`,update);
            if(response?.status === 200){
              toast.success(response?.data?.message,{
                position:'bottom-right'
              })
              auth.setUser({...auth?.user,theshold:threshold})
            }else if(response?.status === 404){
              toast.error(response?.data?.message,{
                position:'bottom-right'
              })
            }
          }
          
        }
      }
    }
    setLoading(false)
  }
  console.log(textarea)
  useEffect(()=>{
    if(auth.user !== null){
      setValue('threshold',auth.user.theshold)
      setValue('receive',auth.user.receive_notification)
      if(isChecked){
        setTextArea(auth?.user?.receive_email)
      }
    }
  },[setValue,auth,isChecked])

  return (
    <div className="container flex flex-col items-center justify-center pt-20 pb-10 lg:space-y-0 ">
      <div className="flex flex-col justify-center mx-auto w-full sm:w-[300px] space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <Icons.logo className="w-20 h-20"/>
          <h1 className="font-bold text-2xl">User Setting</h1>
        </div>
        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmits)}>
            <div className="grid gap-2">
              <div className="grid gap-1.5">
                <div className="form-floating grid gap-1 py-2">
                    <input 
                        {...register('threshold')} 
                        type="text" 
                        className={cn('form-control',{
                            "focus-visible:ring-red-500":errors.threshold
                        })} 
                        id="floatingInput" 
                        placeholder="Number..." 
                    />
                    <label htmlFor="floatingInput">threshold</label>
                </div>
                <div className="flex items-center gap-2 py-2">
                    <input 
                        {...register('receive')} 
                        type="checkbox" 
                        className={cn('w-4 h-4 rounded-xl ',{
                            "focus-visible:ring-red-500":errors.receive,
                        })} 
                        id="floatingInput" 
                    />
                    <label htmlFor="floatingInput">Receive Notification</label>
                </div>
                <div className="flex items-center gap-2 py-2">
                      <Input 
                        type="checkbox"
                        value={isChecked}
                        onChange={()=>setIsChecker(isChecked === 0 ? 1 : 0)}
                        id="checkboxEmail"
                        className="w-4 h-4"
                      />
                      <label id="checkboxEmail">Add Emails To Receive Notification</label>
                    {/* <Button type="button" className="w-full" variant={'default'} onClick={()=>setIsChecker(isChecked === 0 ? 1 : 0)}>Add Emails To Receive A Notification</Button> */}
                </div>
                {
                  isChecked ? <div className="flex items-center gap-2 py-2">
                                  <Textarea 
                                    placeholder="name1@example.com,name2@example.com" 
                                    value={textarea}
                                    onChange={(e)=>setTextArea(e.target.value)}
                                  />
                              </div>  :null
                }
              </div>
              <button type="submit" className={cn(buttonVariants({variant:'default'}),'w-full')}>{loading ? <Spinner className='flex items-center mx-auto justify-center' /> : "Save Settings"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Setting