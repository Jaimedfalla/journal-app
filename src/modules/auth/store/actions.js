import authApi from "@/api/authApi"

export const createUser = async({commit},user)=>{
    const {name,email,password} = user
    try{
        const {data} = await authApi.post('accounts:signUp',{
            email,password,returnSecureToken:true
        })
        const {idToken,refreshToken} = data
        await authApi.post('accounts:update',{displayName:name,idToken})

        delete user.password
        commit('loginUser',{user,idToken,refreshToken})
        return {ok:true}
    }
    catch(error){
        console.log(error.repsonse)
        return {ok:false,message:error.repsonse.data.error.message}
    }
}

export const loginUser = async({commit},{email,password})=>{
    try{
        const {data} = await authApi.post('accounts:signInWithPassword',{
            email,password,returnSecureToken:true
        })
        const {idToken,refreshToken} = data
        commit('loginUser',{user:{email},idToken,refreshToken})
        return{ok:true}
    }
    catch(error){
        console.log(error.repsonse)
        return {ok:false,message:error.repsonse.data.error.message}
    }
}