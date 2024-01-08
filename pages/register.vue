<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import { ref } from 'vue';

const { authenticated, userName } = storeToRefs(useAuthStore());

const { registerUser } = useAuthStore();

const router = useRouter();

const login = ref('');
const pass = ref('');

const formSubmit = async () => {
    if (login.value.length > 2 && pass.value.length > 3) {
        const newUser = {
            username: login.value,
            password: pass.value
        }
        await registerUser(newUser);
        
        if (!authenticated.value) return null;

        authenticated.value = true;
        login.value = "";
        pass.value = "";
        return router.push('/');
    } 

    return null;
}
</script>

<template>
    <form class="flex flex-col w-2/6 p-6 shadow-[0_1px_9px_2px_rgba(0,0,0,0.5)] gap-6 bg-teal-800 rounded"
        @submit.prevent="formSubmit"
    >
        <h2 class="text-center text-2xl">Register</h2>
        <div class="flex flex-col">
            <label for="login" class="text-white mb-4">Login</label>
            <input id="login" 
                class="p-2 rounded w-full text-black" type="text" 
                placeholder="write your login..."
                v-model.trim="login"
                required
            >
            <span class="text-sm text-red-600" v-if="login.length < 3 && login.length > 0">your login cannot be less than 3 symbols</span>
        </div>
        <div class="flex flex-col mb-6">
            <label for="password" class="text-white mb-4">Password</label>
            <input id="password"
                class="p-2 rounded w-full text-black" 
                type="password"
                placeholder="password"
                v-model.trim="pass"
                required
            >
            <span class="text-sm text-red-600" v-if="pass.length < 4 && pass.length > 0">incorrect pass, write more then 4 symbols</span>
        </div>
        <button class="bg-cyan-600 rounded p-4 self-center text-white font-semibold text-lg text-center" type="submit">Submit</button>
    </form>
</template>