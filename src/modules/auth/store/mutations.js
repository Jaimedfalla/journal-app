export const loginUser = (state,{user,idToken,refreshToken})=>{
    if(idToken){
        localStorage.setItem('idToken',idToken)
        state.idToken = idToken
    }
    if(refreshToken){
        localStorage.setItem('refreshToken',refreshToken)
        state.refreshToken = refreshToken
    }

    state.user = user
    state.state = 'authenticated'
}

export const logOut=(state)=>{
    state.user =null
    state.refreshToken = null
    state.idToken = null
    state.status='not-authenticated'
    localStorage.removeItem('idToken')
    localStorage.removeItem('refreshToken')
}