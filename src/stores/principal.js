import { ref } from 'vue';
import { defineStore } from 'pinia';
import { checkPrincipalApi } from '@/apis/principal/principal';
import { jwtDecode } from 'jwt-decode';


export const usePrincipalStore = defineStore('user', () => {
    const user = ref(null);
  
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          user.value = jwtDecode(token);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    };
  
    return { user, fetchUser };
  });