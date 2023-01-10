import router from '@/modules/daybook/router'

describe('Pruebas en el router de DayBook',()=>{
    
    it('El router debe tener esta configuración',()=>{
        expect(router).toMatchObject({
            name:'daybook',
            component: expect.any(Function),
            children:[
                {
                    path:'',
                    name:'no-entry',
                    component: expect.any(Function),
                },
                {
                    path:':id',
                    name:'entry',
                    component: expect.any(Function),
                    props:expect.any(Function),
                }
            ]
        })
    })

    it('Los componentes cargados deben ser los configurados',async ()=>{
        const promiseRoutes = []
        router.children.forEach(child => promiseRoutes.push(child.component()))
        const routes = (await Promise.all(promiseRoutes)).map(route => route.default.name)
        expect(routes).toContain('EntryView')
        expect(routes).toContain('NoEntrySelected')
    })

    it('Debe retornar el id de la ruta',()=>{
        const route = {
            params:{
                id:'ABC-123'
            }
        }

        const routeEntry = router.children.find(r => r.name==='entry')
        expect(routeEntry.props(route)).toEqual({id:'ABC-123'})
    })
})  