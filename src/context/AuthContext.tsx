import { createContext, useState, useEffect, Dispatch, SetStateAction, ReactNode, FC } from "react";
import { baseAPI } from "../api";
import { authConfig } from "../config/auth";
import { toast } from "react-toastify";
import { useDispatch } from "../lib/redux";
import { refrashState } from "../lib/redux/slice/certificates/thunk";

type User= {
    name: string,
    email: string,
    id:number,
    theshold:string,
    receive_notification:boolean,
    receive_email:string
  }

  interface DefaultProvider {
    user: User | null;
    loading: boolean;
    setUser: Dispatch<SetStateAction<User | null>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    login: (userData: any, errCallBack: any,rememberMe:string) => Promise<void>;
    logout: () => void;
    register: (userData: any, errCallBack: any) => Promise<void>;
  }

  const defaultProvider: DefaultProvider = {
    user: null,
    loading: false,
    setUser: () => null,
    setLoading: () => true,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve(),
  }


const AuthContext = createContext(defaultProvider);

interface AuthProviderProps {
    children: ReactNode;
}


const AuthProvider: FC<AuthProviderProps> = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(defaultProvider.user);
    const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
    const dispatch=useDispatch()

    useEffect(()=>{
        const initAuth = async () => {
            
            const storedToken=window.localStorage.getItem(authConfig.storageTokenKeyName);
            if(storedToken){
              setLoading(true);
              const stringUser=localStorage.getItem(authConfig.storageUserKeyName);
              const user=JSON.parse(stringUser ?? '') ?? null
              await baseAPI.get(authConfig.refreshTokenEndPoint+'/'+user.id,{
                headers:{
                  "Authorization":storedToken
                }
              }).then(async response=>{
                setLoading(false)
                setUser({...response?.data?.user})
              }).catch(()=>{
                localStorage.removeItem(authConfig.storageTokenKeyName)
                localStorage.removeItem(authConfig.storageUserKeyName)
                setUser(null)
                setLoading(false)
                console.log('hear')
              })
            }
          };
          initAuth();
    },[])

    const handleRegister = async (userData: any, errCallBack: any) => {
        try {
          setLoading(true);
          const response = await baseAPI.post(authConfig.signUpEndpoint, userData);
          
          if(response.status === 200){
            toast.success(response?.data?.message)
          }

          setLoading(false)
        } catch (error) {
          if (errCallBack) errCallBack(error);
        }
      };

      const handleLogin = async (userData:any,errCallBack:any,rememberMe:string) => {

        setLoading(true)
    
        try {
          const response= await baseAPI.post(authConfig.loginEndpoint,userData);
          if(response?.status === 201){
            setUser({receive_email:response?.data?.user?.receive_email,id:response?.data?.user?.id,email:response?.data?.user?.email,name:response?.data?.user?.name,theshold:response?.data?.user?.theshold,receive_notification:response?.data?.user?.receive_notification})
            
            if(rememberMe === 'true'){

              const {email,name,id,theshold,receive_notification,receive_email,...other}=response?.data?.user
              window.localStorage.setItem(authConfig.storageUserKeyName,JSON.stringify({email,name,id,theshold,receive_notification,receive_email}))
              const token=`Bearer ${response?.data?.token}`
              window.localStorage.setItem(authConfig.storageTokenKeyName,token)
            }
      
            toast.success(response?.data?.message)
    
          }
          setLoading(false)
        } catch (error) {
          if(errCallBack) errCallBack(error);
        }
      };

      const handleLogout = () => {
        setUser(null)
        localStorage.removeItem(authConfig.storageTokenKeyName)
        localStorage.removeItem(authConfig.storageUserKeyName)
        dispatch(
          refrashState()
        )
      };

      const values = {
        user,
        loading,
        setUser,
        setLoading,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister
      };
    
      return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export { AuthProvider ,AuthContext};