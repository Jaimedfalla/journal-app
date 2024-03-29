import { journalState,entries,entry } from "../../../../mock-data/test-journal-state"
import journalApi from '@/api/journalApi'
import {createVuexStore} from '../../__mocks__/journal-store'

describe('Pruebas en el journal module',()=>{
    it('Estado inicial',()=>{
        const store = createVuexStore(journalState)
        const {isLoading,entries} = store.state.journal

        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)
    })

    it('Mutation set entries',()=>{
        const store = createVuexStore({
            isLoading:true,
            entries:[]
        })

        store.commit('journal/setEntries',journalState.entries)
        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.isLoading).toBeFalsy()
    })

    it('Mutation update entry',()=>{
        const updatedEntry = {
            id:"-NLMbHV4ZdCXF7IGwdhO",
            date: "2023-01-09T17:38:44.103Z",
            text: "Prueba de update Entry con foto",
            picture:"https://res.cloudinary.com/dstyfk698/image/upload/v1673282666/cld-sample-4.jpg"
        }
        const store = createVuexStore(journalState)
        store.commit('journal/updateEntry',updatedEntry)
        const entry = store.state.journal.entries.find(e=>e.id==="-NLMbHV4ZdCXF7IGwdhO")
        expect(store.state.journal.entries.length).toBe(2)
        expect(entry).toEqual(updatedEntry)
    })

    it('Mutation add and delete Entry',()=>{
        const store = createVuexStore(journalState)
        const entry = {
            id:"ABC-123",
            date: new Date().toISOString(),
            text: "Nueva entrada"
        }

        store.commit('journal/addEntry',entry)
        let entries = store.state.journal.entries
        expect(entries.length).toBe(3)
        expect(entries.find(e=> e.id===entry.id)).toEqual(entry)

        store.commit('journal/deleteEntry',entry.id)
        entries = store.state.journal.entries
        expect(entries.length).toBe(2)
        expect(entries.find(e=> e.id===entry.id)).toBeFalsy()
    })

    it('Getters: getEntriesByTerm and getentryById',()=>{
        const store = createVuexStore(journalState)
        const [entry1,entry2] = journalState.entries

        expect(store.getters['journal/getEntriesByTerm']('')).toEqual(journalState.entries)
        expect(store.getters['journal/getEntriesByTerm']('Nueva')).toEqual([entry2])
        expect(store.getters['journal/getEntryById']('-NLMbHV4ZdCXF7IGwdhO')).toEqual(entry1)
    })

    it('Actions: LoadEntries',async ()=>{
        const store = createVuexStore({
            isLoading:true,
            entries:[]
        })

        const spyGet = jest.spyOn(journalApi, 'get').mockReturnValue({
            data:{...entries}
        })

        await store.dispatch('journal/loadEntries')
        
        expect(spyGet).toHaveBeenCalledTimes(1)
        expect(store.state.journal.entries.length).toBe(2)
    })

    it('Actions: updateEntry',async ()=>{
        const store = createVuexStore(journalState)
        const updatedEntry = {...entry,
            otroCampo:true,
            otroMas:{a:1}
        }

        const spyPut = jest.spyOn(journalApi, 'put').mockReturnValue()

        await store.dispatch('journal/updateEntry',updatedEntry)

        expect(spyPut).toHaveBeenCalledTimes(1)
        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.entries.find(e=> e.id===updatedEntry.id)).toEqual(entry)
    })

    it('Actions: createEntry', async()=>{
        const store = createVuexStore(journalState)
        const spyPost = jest.spyOn(journalApi, 'post').mockReturnValue({
            data:{
                name:'aaaaaaa'
            }
        })
        const {date,text,picture} = entry;
        await store.dispatch('journal/createEntry',{date,text,picture})
        expect(spyPost).toHaveBeenCalledTimes(1)
        expect(store.state.journal.entries.length).toBe(3)
        expect(store.state.journal.entries.find(e=> e.id==='aaaaaaa')).toBeTruthy()
    })

    it('Actions: delete Entry', async()=>{
        const store = createVuexStore(journalState)
        const spyDelete = jest.spyOn(journalApi, 'delete').mockReturnValue()
        const id = "-NLMbHV4ZdCXF7IGwdhO"
        await store.dispatch('journal/deleteEntry',id)

        expect(spyDelete).toHaveBeenCalledTimes(1)
        expect(store.state.journal.entries.length).toBe(1)
        expect(store.state.journal.entries.find(e=> e.id===id)).toBeFalsy()
    })
})