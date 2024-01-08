<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from '~/store/auth';

const { authenticated, userName } = storeToRefs(useAuthStore());
</script>

<template>
    <h1 class="text-4xl">Welcome! {{ userName.split(' ')[1].slice(0, -1) }}</h1>
</template>