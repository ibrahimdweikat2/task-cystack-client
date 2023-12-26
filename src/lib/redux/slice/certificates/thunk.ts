import { toast } from "react-toastify";
import { baseAPI } from "../../../../api";
import { certificateEndPoint, certificatesByUserId, storageCertificateEndPoint } from "../../../../constants/certificate";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { AxiosRequestConfig } from "axios";


export const getCertificateBySearch=createAppAsyncThunk('certificate/getCertificateBySearch',async (search:any)=>{
    try {
        const response= await baseAPI.get(certificateEndPoint,{
            headers:{
                "search":search
            }
        });

        if(response.status === 200){
            toast.success(response.data.message);
            console.log(response.data)

            return response.data.certificates
        }
    } catch (error:any) {
        toast.error(error?.response?.data?.message)
    }
})

export const filterCertificates=createAppAsyncThunk('certificate/filterCertificates',async (certificate:any)=>{
    console.log(certificate)
    return certificate;
})


export const storageAllCertificates=createAppAsyncThunk('certificate/storageAllCertificates',async ({certificate,userId,domain}:{certificate:any,userId:any,domain:any})=>{
    try {
        const stringCertificates= JSON.stringify(certificate);
        const response = await baseAPI.post(storageCertificateEndPoint+`/${userId}`,{
            certificates:stringCertificates,
            domain
        });
        if(response.status === 200){
            toast.success(response?.data?.message)
        }
        else{
            return response.data;
        }

    } catch (error:any) {
        toast.error(error?.response?.data?.message)
    }
})


export const getAllCertificatesByUserId = createAppAsyncThunk('certificate/getAllCertificatesByUserId',async ({userId}:any)=>{
    try {
        const response= await baseAPI.get(certificatesByUserId+`/${userId}`);
        if(response.status === 200){
            if(response.data.certificates !== null){
                return response.data.certificates
            }
            return []
        }
    } catch (error) {
        console.log(error)
        return error;
    }
})

export const refrashState = createAppAsyncThunk('certificate/refreshState',async ()=>{

})