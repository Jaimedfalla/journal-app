import axios from "axios";

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']

const getDayMonthYear =(dateString)=>{
    const date = new Date(dateString);

    return{
        day:date.getDate(),
        month:months[date.getMonth()],
        yearDay:`${date.getFullYear()}, ${days[date.getDay()]}`
    }
}

const uploadImage = async (file)=>{
    if(!file) return

    try{
        const formData = new FormData()
        formData.append('upload_preset','dailybook')
        formData.append('file',file)

        const url = 'https://api.cloudinary.com/v1_1/dstyfk698/image/upload'
        const {data} = await axios.post(url,formData)

        return data.secure_url;

    }catch(error){
        console.error('Error al cargar la imagen, revisar logs')
        console.log(error)
        return null
    }
}

export {getDayMonthYear,uploadImage};