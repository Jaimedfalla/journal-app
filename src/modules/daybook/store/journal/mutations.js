export const setEntries = (state,entries)=>{
    state.entries =[...state.entries,...entries]
    state.isLoading = false    
}

export const updateEntry = (state,data)=>{
    const idx = state.entries.map(e=> e.id).indexOf(data.id)
    state.entries[idx] = data
}

export const addEntry = (state,newEntry)=>{
    state.entries = [{...newEntry},...state.entries]
}

export const deleteEntry = (state,id) => {
    state.entries = state.entries.filter(entry => entry.id !==id)
}