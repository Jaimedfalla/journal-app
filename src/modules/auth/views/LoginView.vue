<template>
    <span class="login100-form-title p-b-41">
        Ingresar
    </span>
    <form @submit.prevent="singIn" class="login100-form validate-form p-b-33 p-t-5">

        <div class="wrap-input100 validate-input" data-validate = "Enter username">
            <input v-model="userForm.email" class="input100" type="email"
                    placeholder="Correo" required>
            <span class="focus-input100" data-placeholder="&#xe82a;"></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate="Enter password">
            <input v-model="userForm.password" class="input100" type="password" placeholder="Contraseña" required>
            <span class="focus-input100" data-placeholder="&#xe80f;"></span>
        </div>

        <div class="container-login100-form-btn m-t-32">
            <button type="submit" class="login100-form-btn">
                Login
            </button>

        </div>

        <div class="container-login100-form-btn m-t-32">
            <router-link :to="{name:'register'}">¿No tienes cuenta?</router-link>
        </div>
    </form>
</template>

<script>
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import useLogin from '../composables/useLogin';

export default {
    setup(){
        const router = useRouter()
        const {login,userForm} = useLogin()

        return {
            userForm,
            singIn:async()=>{
                const {ok,message} = await login()
                if(!ok) return Swal.fire('Error', message,'error')

                router.push({name:'no-entry'})
            }
        }
    }
}
</script>