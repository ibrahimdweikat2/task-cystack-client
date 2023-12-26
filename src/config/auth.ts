type AuthConfig ={
    loginEndpoint:string,
    signUpEndpoint:string,
    storageTokenKeyName:string,
    storageUserKeyName:string,
    refreshTokenEndPoint:string
}

export const authConfig:AuthConfig ={
    loginEndpoint:'/login',
    signUpEndpoint:'/register',
    refreshTokenEndPoint:'refresh-token',
    storageTokenKeyName: 'accessToken',
    storageUserKeyName:'userData',
}