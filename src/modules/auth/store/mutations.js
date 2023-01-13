export const loginUser = (state,{user,idToken,refreshToken})=>{
    if(idToken){
        state.idToken = idToken
    }
    if(refreshToken){
        state.refreshToken = refreshToken
    }

    state.user = user
    state.state = 'authenticated'
}