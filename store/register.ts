import { defineStore } from 'pinia';

interface UserPayloadInterface {
  username: string;
  password: string;
}

export const useRegisterStore = defineStore('register', {
  state: () => ({
    registered: false,
    newUserName : ""
  }),
  actions: {
    async registerUser({ username, password }: UserPayloadInterface) {
        return fetch('http://localhost:5000/auth/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) return console.log(data);
            
            this.registered = true;
            this.newUserName = data?.username;
            const token = useCookie('token');
            return token.value = data?.token;
        })
        .catch(error => console.error('Ошибка:', error));
        
    //   const { data, pending }: any = await useFetch('http://localhost:5000/auth/registration', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: {
    //       username,
    //       password,
    //     },
    //   });
      
    //   this.loading = pending;

    //   console.log(data);
      

    //   if (data.value) {
    //     const token = useCookie('token');
    //     token.value = data?.value?.token;
    //     this.registered = true;
    //   }
    },
    logUserOut() {
      const token = useCookie('token');
      this.registered = false;
      token.value = null;
    },
  },
});