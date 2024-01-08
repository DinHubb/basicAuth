<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from '~/store/auth';

const router = useRouter();

const { logUserOut } = useAuthStore();

const { authenticated, userName } = storeToRefs(useAuthStore());

const logout= () => {
    logUserOut();
    router.push('/login')
}
</script>

<template>
    <div class="bg-cyan-950 flex flex-col min-h-[100vh] overflow-hidden">
        <header class="mb-20 bg-neutral-300">
            <div class="max-w-[1360px] m-auto relative">
                <div class="absolute top-[13px] font-bold text-xl" v-if="!authenticated"><h2>LOGO</h2></div>
                <nav class="">
                    <ul class="flex justify-between gap-4">
                        <div class="flex gap-2">
                            <li class="hover:bg-zinc-700 hover:text-white active:opacity-90" v-if="authenticated"><nuxt-link to="/" class="block p-4">Home</nuxt-link></li>
                            <li class="hover:bg-zinc-700 hover:text-white active:opacity-90" v-if="authenticated"><nuxt-link to="/about" class="block p-4">About</nuxt-link></li>
                            <li class="hover:bg-zinc-700 hover:text-white active:opacity-90" v-if="authenticated"><nuxt-link to="/admin" class="block p-4">Admin panel</nuxt-link></li>
                        </div>
                        <div class="flex gap-2">    
                            <li class="hover:bg-zinc-700 hover:text-white active:opacity-90" v-if="!authenticated"><nuxt-link to="/login" class="block p-4">Login</nuxt-link></li>
                            <li class="hover:bg-zinc-700 hover:text-white active:opacity-90" v-if="!authenticated"><nuxt-link to="/register" class="block p-4">Register</nuxt-link></li>
                            <li class="bg-zinc-700 text-white hover:text-black hover:bg-white active:opacity-60" v-if="authenticated"><nuxt-link class="block p-4 cursor-pointer">connected: {{ userName }}</nuxt-link></li>
                            <li class="hover:bg-zinc-700 hover:text-white active:opacity-90" v-if="authenticated"><nuxt-link class="block p-4 cursor-pointer" @click="logout">Loguot</nuxt-link></li>
                        </div>    
                    </ul>
                </nav>
            </div>    
        </header>
        <main class="flex-[1_1_auto] text-white">
            <section class="mb-20">
                <div class="max-w-[1360px] m-auto flex justify-center items-center">
                    <slot />
                </div>
            </section>
        </main>
        <footer class="bg-zinc-800 p-6">
            <h2 class="text-center text-2xl text-white">Footer</h2>
        </footer>
    </div>
</template>