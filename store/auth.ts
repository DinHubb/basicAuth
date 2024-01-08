import { defineStore } from 'pinia';

interface UserPayloadInterface {
  username: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    userName: '',
    userRole: ''
  }),
  actions: {
    async authenticateUser({ username, password }: UserPayloadInterface) {
      const { data }: any = await useFetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          username,
          password,
        },
      });

      if (!data.value) return null;
      
      const user = useCookie('user');
      this.userName = data?.value?.username;
      this.userRole = data?.value?.roles;
      user.value = `name: ${this.userName}, role: ${this.userRole}`
      const token = useCookie('token');
      this.authenticated = true;
      return token.value = data?.value?.token;
    },
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
            
            const user = useCookie('user');
            this.userName = data?.username;
            this.userRole = data?.roles;            
            
            user.value = `name: ${this.userName}, role: ${this.userRole}`
            this.authenticated = true;
            const token = useCookie('token');
            return token.value = data?.token;
        })
        .catch(error => console.error('Ошибка:', error));
    },
    logUserOut() {
      const token = useCookie('token');
      const user = useCookie('user')
      this.authenticated = false;
      token.value = null;
      user.value = null;
      return;
    },
  },
});
