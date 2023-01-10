import {BASE_URL, uploadImage} from '@/modules/daybook/helpers/functions'
import axios from 'axios'

jest.mock('axios')

describe('Functions helpers',()=>{

    it('Debe cargar un archivo y retornar el url',async()=>{        
        axios.post.mockResolvedValue({
            data:{
                secure_url:'https://www.google.com.co'
            }
        })

        const file = new File([],'foto.jpg')
        const url = await  uploadImage(file)
        expect(axios.post).toHaveBeenCalled()
        expect(axios.post.mock.calls[0][0]).toEqual(BASE_URL)
        expect(axios.post.mock.calls[0][1]).toBeInstanceOf(FormData)
        expect(url).toBe('https://www.google.com.co')
    })
})