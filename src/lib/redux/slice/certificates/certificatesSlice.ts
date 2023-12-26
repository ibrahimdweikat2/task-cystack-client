import { PayloadAction, createSlice  } from "@reduxjs/toolkit";
import { filterCertificates, getAllCertificatesByUserId, getCertificateBySearch, refrashState, storageAllCertificates } from "./thunk";

const TCertificates={
    issuer_ca_id:0,
    issuer_name:'',
    common_name:'',
    name_value:'',
    id:0,
    entry_timestamp:'',
    not_before:'',
    not_after:'',
    serial_number:'',
    result_count:0,
    domain:'',
    is_send:false,
}

export type T={
    common_name:string,
    not_before:string,
    not_after:string,
    domain:string,
    is_send:number,
    issuer_name?:string
}

interface Certificate{
    certificate:Array<typeof TCertificates> | Array<T> | []
    error:string
    status:'idle' | 'pending'
    statusStorage:'idle' | 'pending'
}

const initialState:Certificate={
    certificate:[],
    status:'idle',
    error:'',
    statusStorage:"idle",
}


export const certificatesSlice=createSlice({
    name: 'certificate',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCertificateBySearch.pending,(state,action)=>{
            state.status='pending';
            state.certificate=[]
        });

        builder.addCase(getCertificateBySearch.fulfilled,(state,action:PayloadAction<Array<typeof TCertificates> | null>)=>{
            action?.payload === null ? state.error='Something went wrong' : state.certificate=[...action.payload] 
            state.status='idle';
        });

        builder.addCase(getCertificateBySearch.rejected,(state,action)=>{
            state.error='Some error occurred'
        });

        builder.addCase(filterCertificates.pending,(state)=>{
            state.status='pending';
        })

        builder.addCase(filterCertificates.fulfilled,(state,action:PayloadAction<Array<typeof TCertificates> | null>)=>{
            const now=new Date();
            const filterCertificates= action?.payload?.filter(item=> new Date(item?.not_after) > now);
            state.certificate=filterCertificates ?? []
            state.status='idle';
        })

        builder.addCase(storageAllCertificates.pending,(state)=>{
            state.statusStorage='pending';
        })

        builder.addCase(storageAllCertificates.fulfilled,(state)=>{
            state.statusStorage='idle'
        })

        builder.addCase(getAllCertificatesByUserId.pending,(state)=>{
            state.status='pending'
        })

        builder.addCase(getAllCertificatesByUserId.fulfilled,(state,action)=>{
            if(action?.payload?.length > 0){
                state.certificate=[]
                const newArray:any=[];
                action?.payload.forEach((element:any) => {
                    const {certificate_id:id,common_name,not_after,not_before,is_send,issuer_name,...other}=element
                    newArray.push({id,common_name,not_after,not_before,is_send,issuer_name})
                });
                state.certificate=[...newArray]
            }
            state.status='idle'
        })

        builder.addCase(refrashState.fulfilled,(state)=>{
            state.certificate=[]
            state.status='idle'
            state.error=''
            state.statusStorage='idle'
        })
    }
})