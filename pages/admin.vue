<script setup>
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useAuthStore } from '~/store/auth';

const { userName } = storeToRefs(useAuthStore());

const token = useCookie('token');
const users = ref([]);
const hasUsers = ref('');
const rolesUser = userName.value.split(' ')[3];

const getUsers = async () => {
    if (rolesUser !== "ADMIN") return hasUsers.value = 'You are not the Admin'
    return await fetch('http://localhost:5000/auth/users', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
    },
})
    .then(response => response.json())
    .then(data => {
        if (data.length < 1) return hasUsers.value = 'Users not found';
        users.value = data;
        return hasUsers.value = 'Users:';
    })
    .catch(error => console.error('Error:', error));
}

const deleteUsers = async (userId) => {
    console.log(userId);
    try {
        const response = await fetch(`http://localhost:5000/auth/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token.value}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Assuming you want to update the users array after deletion
        // You might want to filter out the deleted user or fetch the updated list again
        users.value = users.value.filter(user => user._id !== userId);

        console.log(`User with ID ${userId} deleted successfully`);
    } catch (error) {
        console.error('Error:', error);
    }
    console.log(users.value.length);
}
</script>

<template>
    <div>
        You can see the users by click here <button class="font-semibold underline text-orange-800 active:text-white cursor-pointer" @click="getUsers">get users</button>
        <article class="p-2 mt-6">
            <div class="text-center">{{ hasUsers }}</div>
            <div class="border p-4 my-4 flex items-center justify-between" v-for="user in users" :key="user._id">
                <span>Name: {{ user.username }}</span>
                <span class="">roles: {{ user.roles }}</span>
                <button class="ml-2 p-2 border active:bg-white active:text-black" @click="deleteUsers(user._id)">remove</button>
            </div>
        </article>
    </div>
</template>