import { journalState } from "../__mocks__/test-journal-state"
import {createVuexStore} from '../__mocks__/global-functions'
import { shallowMount } from "@vue/test-utils"
import EntryView from "@/modules/daybook/views/EntryView.vue"
import Swal from "sweetalert2"
import * as functions from '@/modules/daybook/helpers/functions'

//Para emular el comportamiento de SweetAlert
jest.mock('sweetalert2',()=>({
    fire:jest.fn(),
    showLoading:jest.fn()
}))

describe('Pruebas en el entry view',()=>{

    const store = createVuexStore(journalState)
    store.dispatch = jest.fn()

    const mockRouter = {
        push:jest.fn()
    }

    let wrapper

    beforeEach(()=>{
        jest.clearAllMocks()

        wrapper = shallowMount(EntryView,{
            props:{
                id:'-NLMbSJH-FO9UimMeioF'
            },
            global:{
                mocks:{
                    $router:mockRouter
                },
                plugins:[store]
            },
        })
    })

    it('Debe sacar al usuario porque el id no existe',()=>{
        shallowMount(EntryView,{
            props:{
                id:'Este id no existe en el store'
            },
            global:{
                mocks:{
                    $router:mockRouter
                },
                plugins:[store]
            },
        })

        expect(mockRouter.push).toHaveBeenCalledWith({name:'no-entry'})
    })

    it('Debe mostrar la entrada correctamente',()=>{
        expect(wrapper.html()).toMatchSnapshot()
        expect(mockRouter.push).not.toHaveBeenCalled()
    })

    it('Debe borrar la entrada y salir',(done)=>{
        Swal.fire.mockReturnValueOnce(Promise.resolve({isConfirmed:true}))
        wrapper.find('.btn-danger').trigger('click')
        expect(Swal.fire).toHaveBeenCalledWith({
            title:'¿Está seguro',
            text:'Una vez borrado, no se podrá recuperar',
            showDenyButton:true,
            confirmButtonText:'Sí, estoy seguro'
        })

        setTimeout(()=>{
            expect(store.dispatch).toHaveBeenCalledWith('journal/deleteEntry','-NLMbSJH-FO9UimMeioF')
            expect(mockRouter.push).toHaveBeenCalled()
            done()
        },1)
    })

    it('Debe guardar la nueva entrada',async()=>{
        const wrapper = shallowMount(EntryView,{
            props:{
                id:'new'
            },
            global:{
                mocks:{
                    $router:mockRouter
                },
                plugins:[store]
            },
        })
 
        const uploadSpy = jest.spyOn(functions,'uploadImage')
            .mockResolvedValueOnce(Promise.resolve("https://www.google.com"))
            
        const textarea = wrapper.find('textarea')
        textarea.text = 'Entrada del Test unitario'
        await wrapper.find('fab-stub').trigger('click')        
        expect(uploadSpy).toHaveBeenCalledTimes(1)
        expect(Swal.fire).toHaveBeenCalledWith({
            title:'Espere por favor',
            allowOutsideClick:false
          })
    })
})