import {z} from 'zod'


export const signUpCredentialValidator=z.object({
    email:z.string().email(),
    password:z.string().min(8,{message:"password must be at least 8 characters"}),
    firstName:z.string().min(3,{message:"first name must be at least 3 characters"}),
    lastName:z.string().min(3,{message:"last name must be at least 3 characters"}),
})

export type TSignUpCredentialValidator=z.infer<typeof signUpCredentialValidator>


export const signInCredentialValidator=z.object({
    email:z.string().email(),
    password:z.string().min(8,{message:"password must be at least 8 characters"}),
    rememberMe:z.boolean()
})

export type TSignInCredentialValidator=z.infer<typeof signInCredentialValidator>

export const searchCredentialValidator=z.object({
    search:z.string().min(1,{message:"search must be at least 1 character"})
})

export type TSearchCredentialValidator=z.infer<typeof searchCredentialValidator>


export const UserSettingsValidator=z.object({
    threshold:z.string(),
    receive:z.boolean(),
})

export type TUserSettingsValidator = z.infer<typeof UserSettingsValidator>;