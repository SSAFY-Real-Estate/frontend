import { ref } from 'vue';
import { defineStore } from 'pinia';
import { checkPrincipalApi } from '@/apis/principal/principal';


export const usePrincipalStore = defineStore('principal', () => {
    // 상태
    const principal = ref(null);
    const isLoading = ref(false);
    const error = ref(null);
  
    // API 호출 메서드
    async function fetchPrincipal() {
      isLoading.value = true;
      error.value = null;
  
      try {
        const response = await checkPrincipalApi();
        principal.value = response;
      } catch (err) {
        error.value = '오류가 발생하였습니다.';
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    }
  
    // 초기화 메서드
    function resetPrincipal() {
      principal.value = null;
    }
  
    return { principal, isLoading, error, fetchPrincipal, resetPrincipal };
  });