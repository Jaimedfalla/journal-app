import { shallowMount } from "@vue/test-utils";
import EntryDayBook from "@/modules/daybook/components/EntryDayBook.vue";
import { entry } from "../__mocks__/test-journal-state";

describe('Pruebas en Entry component',()=>{

    let wrapper;
    const mockRouter = {
        push: jest.fn()
    }

    beforeAll(()=>{
        wrapper = shallowMount(EntryDayBook,{
            props:{
                entry
            },
            global:{
                mocks:{
                    $router:mockRouter
                }
            }
        })
    })

    it('Debe hacer match con el snapshot',()=>{
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('Debe redireccionar al hacer click en el entry-container',()=>{
        wrapper.find('.entry-container').trigger('click')

        expect(mockRouter.push).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledWith({name:'entry',params:{id:entry.id}})
    })

    it('Pruebas en las propiedades computadas',()=>{
        expect(wrapper.vm.day).toBe(9)
        expect(wrapper.vm.month).toBe("Enero")
        expect(wrapper.vm.yearDay).toBe("2023, Lunes")
    })
})