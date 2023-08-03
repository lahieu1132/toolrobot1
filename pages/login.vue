<template>
    <div class="login" >
        <div class="login-form">
            <label for="email">Email</label>
            <input type="email" name="email" id="" v-model="email">
            <label for="pass">Mật khẩu</label>
            <input type="password" name="pass" id="" v-model="password">
            <button @click="onlogin"
                style="padding: 6px 8px;"
            >login</button>
        </div>
    </div>
</template>

<script setup>
import {useAuthStore} from '../store/auth'
import { ref , onMounted} from 'vue'

const auth = useAuthStore()

const email = ref("")
const password = ref("")

onMounted(()=>{
    auth.checkLogin()
})

const onlogin = async ()=>{
    await auth.login(email.value, password.value)
    navigateTo('/')
}

</script>

<style lang="scss">
    .login {
        height: 100vh;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px;
        width: 320px;
        input {
            width: 100%;
            padding: 6px 10px;
            max-width: 300px;
        }
        border: 1px solid #ccc;
    }
</style>