import EntryList from '@/modules/daybook/components/EntryList.vue'
import { journalState } from '../../../mock-data/test-journal-state'
import { shallowMount } from '@vue/test-utils'
import { createVuexStore } from '../__mocks__/journal-store'

describe('Pruebas en el EntryList component',()=>{
    
    const mockRouter = {
        push:jest.fn()
    }
    
    const store = createVuexStore(journalState)

    let wrapper;

    beforeEach(()=>{
        jest.clearAllMocks()

        wrapper = shallowMount(EntryList,{
            global:{
                mocks:{
                    $router:mockRouter
                },
                plugins:[store]
            }
        })
    })

    it('Debe llamar el getEntriesByTerm sin término y mostrar 2 entradas',()=>{
        expect(wrapper.html()).toMatchSnapshot()
        expect(wrapper.findAll('entry-day-stub').length).toBe(2)
    })

    it('Debe llamar el getEntriesByTconsterm y filtrar las entradas',async ()=>{
        const input = wrapper.find('input')
        await input.setValue('Nueva')
        expect(wrapper.findAll('entry-day-stub').length).toBe(1)
    })

    it('El botón  de nueva entrada de redireccionar a /new',()=>{
        wrapper.find('button').trigger('click')
        expect(mockRouter.push).toHaveBeenCalledWith({name:'entry',params:{id:'new'}})
    })
})