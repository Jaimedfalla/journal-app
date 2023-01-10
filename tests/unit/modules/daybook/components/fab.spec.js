import FAB from "@/modules/daybook/components/FloatingActionButton.vue";
import { shallowMount } from "@vue/test-utils";

describe('Pruebas en el FAB component',()=>{
    it('Debe mostrar el icono por defecto',()=>{
        const wrapper = shallowMount(FAB)
        const icon = wrapper.find('i')

        expect(icon.exists()).toBeTruthy()
        expect(icon.classes('fa-plus')).toBeTruthy()
    })

    it('Debe mostrar el icono por argumento: fa-circle',()=>{
        const wrapper = shallowMount(FAB,{
            props:{
                icon:'fa-circle'
            }
        })

        const icon = wrapper.find('i')

        expect(icon.exists()).toBeTruthy()
        expect(icon.classes('fa-circle')).toBeTruthy()
    })

    it('Debe emitir el evento on:click cuando se hace click en el botón',()=>{
        const wrapper = shallowMount(FAB)
        wrapper.find('button').trigger('click')
        expect(wrapper.emitted('on:click')).toHaveLength(1)
    })
})