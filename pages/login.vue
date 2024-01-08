<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import { ref } from 'vue';

const { authenticateUser } = useAuthStore();

const { authenticated, userName } = storeToRefs(useAuthStore());
const username = ref('');
const password = ref('');

const router = useRouter();

const loginForm = async () => {
    if (username.value.length > 2 && password.value.length > 3) {
        const user = {
            username: username.value,
            password: password.value
        }
        await authenticateUser(user);
        if (!authenticated.value) return null;
        
        username.value = "";
        password.value = "";
        return router.push('/');
    }
    return null;
};
</script>

<template>
    <form class="flex flex-col w-2/6 p-6 shadow-[0_1px_9px_2px_rgba(0,0,0,0.5)] gap-6 bg-teal-800 rounded"
        @submit.prevent="loginForm"
    >
        <h2 class="text-center text-2xl" @click="test">Login</h2>
        <div class="flex flex-col">
            <label for="login" class="text-white mb-4">Login</label>
            <input id="login" 
                class="p-2 rounded w-full text-black" type="text" 
                placeholder="write your login..."
                v-model.trim="username"
                required
            >
            <span class="text-sm text-red-600" v-if="username.length < 3 && username.length > 0">your login cannot be less than 3 symbols</span>
        </div>
        <div class="flex flex-col mb-6">
            <label for="password" class="text-white mb-4">Password</label>
            <input id="password"
                class="p-2 rounded w-full text-black" 
                type="password"
                placeholder="password"
                v-model.trim="password"
                required
            >
            <span class="text-sm text-red-600" v-if="password.length < 4 && password.length > 0">incorrect pass, write more then 4 symbols</span>
        </div>
        <button class="bg-cyan-600 rounded p-4 self-center text-white font-semibold text-lg text-center" type="submit">Sign in</button>
    </form>
</template>