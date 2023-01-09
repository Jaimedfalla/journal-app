export const getEntriesByTerm = (state)=>( term ='' ) =>{
    if(term.length===0) return state.entries;

    return state.entries.filter(entry => entry.text.toLowerCase().includes(term.toLowerCase()))
}

export const getEntryById = (state)=>(id=0)=>{
    const entry = state.entries.find(entry => entry.id===id);

    //Se hace se de esta forma para devolver un nuevo objeto del entry encontrado y de esta
    // evitar cualquier cambio directamente en el state
    if(!entry) return

    return {...entry}
}