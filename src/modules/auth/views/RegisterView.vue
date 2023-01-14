<template>
    <span class="login100-form-title p-b-41">
        Registrar
    </span>
    <form class="login100-form validate-form p-b-33 p-t-5"
         @submit.prevent="onSubmit"
    >
        <div class="wrap-input100 validate-input" data-validate = "Ingrese su username">
            <input class="input100"
                    type="text"
                    v-model="userForm.name"
                    placeholder="Usuario"
                    required>
                    
            <span class="focus-input100" data-placeholder="&#xe82a;"></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate = "Ingrese su correo">
            <input class="input100"
                    type="email"
                    v-model="userForm.email"
                    placeholder="Correo" required>
            <span class="focus-input100" data-placeholder="&#xe818;"></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate="Ingrese contraseña">
            <input class="input100"
                    type="password"
                    v-model="userForm.password"
                    placeholder="Contraseña" required>
            <span class="focus-input100" data-placeholder="&#xe80f;"></span>
        </div>

        <div class="container-login100-form-btn m-t-32">
            <button type="submit" class="login100-form-btn">
                Crear Cuenta
            </button>

        </div>

        <div class="container-login100-form-btn m-t-32">
            <router-link :to="{name:'login'}">¿Ya tienes cuenta?</router-link>
        </div>
    </form>
</template>

<script>

import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import useRegister from '../composables/useRegister'

export default {
    setup(){
        const router = useRouter()
        const {userForm,createUser} = useRegister()

        return {
            userForm,

            onSubmit:async()=>{
                const {ok,message} = await createUser(userForm.value)
                if(!ok) return Swal.fire('Error',message,'error')

                router.push({name:'no-entry'})
            }
        }
    }
}
</script>