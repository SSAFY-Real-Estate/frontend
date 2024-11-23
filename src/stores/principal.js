import { ref } from 'vue';
import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';
import { getMyInfoApi } from '@/apis/my/my';


export const usePrincipalStore = defineStore('user', () => {
    const user = ref(null);
    const showUserInfo = ref(null);
  
    const fetchUser = async () => {
      const token = localStorage.getItem('AccessToken');
      if (token) {
        try {
          user.value = jwtDecode(token);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
      try {
        const response = await getMyInfoApi(user.value.userId);
        showUserInfo.value = response;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    };
  
    return { user, showUserInfo, fetchUser };
  });