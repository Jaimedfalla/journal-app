import journalApi from "@/api/journalApi"

export const loadEntries = async ({commit})=>{
    const {data} = await journalApi.get('/entries.json')
    const entries = []
    if(data){
        for(let id of Object.keys(data)){
            entries.push({id,...data[id]})
        }
    }

    commit('setEntries',entries)
}

export const updateEntry = async ({commit},entry)=>{
    const {date,picture,text,id} = entry
    const data = {date,picture,text}
    await journalApi.put(`/entries/${id}.json`,data)
    commit('updateEntry',{...data})
}

export const createEntry = async ({commit},entry)=>{
    const {data} = await journalApi.post('/entries.json',entry)
    entry ={id:data.name,...entry}
    commit('addEntry',entry)

    return data.name
}

export const deleteEntry = async ({commit},id) => {
    await journalApi.delete(`/entries/${id}.json`)
    commit('deleteEntry',id)
}