<script setup>
import { useRouter } from 'vue-router';
import { usePrincipalStore } from '@/stores/principal';
import { jwtDecode } from 'jwt-decode';
import { ref } from 'vue';

const router = useRouter();
const flag = ref(false);
const token = localStorage.getItem('AccessToken');
const userInfo = ref(null);
userInfo.value = jwtDecode(token);
console.log(userInfo.value)
</script>

<template>
    <div id="headerWrap">
        <div class="headerLogo">
            <img src="../../assets/headerLogo.png" alt="headerLogo">
        </div>
        <div class="nav">
            <div class="navMap">지도</div>
            <div class="navAdoptation">분양</div>
            <div class="navBoard">게시판</div>
            <div class="navKeep">찜</div>
            <div class="navPutHouse" @click="router.push({name : 'puthouse'})">방내놓기</div>
            <div class="userInfo">
                <div v-if="userInfo==null" @click="router.push({name : 'start'})">로그인 | 회원가입</div>
                <div v-if="userInfo" class="userInfoBox">
                    <div class="userNickname">{{ userInfo.id }} 님</div>
                    <div class="userProfileImg"></div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<style scoped>
    #headerWrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 1400px;
        height: 80px;
        
    }

    .headerLogo {
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .headerLogo > img {
        width: 200px;
    }

    .nav {
        display: flex;
        align-items: center;
        height: 100%;
        font-size: 20px;
        gap: 30px;
    }

    .navMap, .navAdoptation, .navBoard, .navKeep, .navPutHouse {
        transition: all 0.3s;
        cursor: pointer;
    }

    .navMap:hover, .navAdoptation:hover, .navBoard:hover, .navKeep:hover, .navPutHouse:hover {
        color: #56575A;
    }

    .userInfo {
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 220px;
        height: 50px;
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
        border-bottom-left-radius: 25px;
        border-bottom-right-radius: 25px;
        background-color: #3EBEEE;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .userInfo:hover {
        opacity: 0.8;
    }

    .userInfoBox {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .userProfileImg {
        position: absolute;
        right: 5px;
        width: 40px;
        height: 40px;
        background-color: white;
        border-radius: 50%;
    }
</style>