<script setup>
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';
import { onMounted, ref, watch } from 'vue';
import { getMyInfoApi } from '@/apis/my/my';

const router = useRouter();

const userInfo = ref(null);
const buttonflag = ref(false);
const showUserInfo = ref(null);

const logOutClick = () => {
    localStorage.removeItem('AccessToken');
    buttonflag.value = false;
    window.location.replace('/home/main');
}

const goMyButtonClick = () => {
    router.push({name : 'my'})
    buttonflag.value = false;
}

onMounted(() => {
    const token = localStorage.getItem('AccessToken');
    if(token) {
        userInfo.value = jwtDecode(token);
    }
});

watch(userInfo, () => {
    showUserInformation(userInfo.value.userId);
})

const showUserInformation = async(userId) => {
    try {
        const response = await getMyInfoApi(userId);
        showUserInfo.value = response;
        console.log(response);
    } catch (error) {
        alert("오류가 발생했습니다. 서비스를 다시 이용해주세요.");
    }
}

const buttonClick = () => {
    if(userInfo.value) {
        buttonflag.value = !buttonflag.value;
    }
}
</script>

<template>
    <div id="headerWrap">
        <div class="headerLogo" @click="router.push({name : 'main'})">
            <img src="../../assets/headerLogo.png" alt="headerLogo">
        </div>
        <div class="nav">
            <div class="navMap" @click="router.push({name : 'map'})">지도</div>
            <!-- <div class="navAdoptation">분양</div> -->
            <div class="navKeep" @click="router.push({name : 'zzim'})">찜</div>
            <div class="navPutHouse" @click="router.push({name : 'board'})">방내놓기</div>
            <div class="userInfo" @click="buttonClick">
                <div v-if="userInfo == null" @click="router.push({name : 'start'})">로그인 | 회원가입</div>
                <div v-if="userInfo" class="userInfoBox">
                    <div class="userNickname">{{ showUserInfo?.nickname }} 님</div>
                    <div class="userProfileImg">
                        <img v-if="showUserInfo?.profileImgUrl!=''" :src="showUserInfo?.profileImgUrl" alt="profileImgUrl">
                        <div v-if="showUserInfo?.profileImgUrl==''" class="defaultProfileImg">
                            <i class="fa-solid fa-user"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="buttonflag" class="myAndLogout">
                <div @click="goMyButtonClick" class="goMy">마이페이지</div>
                <div @click="logOutClick" class="logOutButton">로그아웃</div>
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
        position: relative;
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
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .userProfileImg > img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .defaultProfileImg {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        font-size: 30px;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .myAndLogout {
        position: absolute;
        right: 0;
        top: 70px;
        z-index: 999;
        width: 220px;
        gap: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 9px;
    }

    .myAndLogout div {
        transition: all 0.3s;
        width: 100%;
        height: 50%;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #3EBEEE;
        border-radius: 9px;
        height: 40px;
    }

    .myAndLogout div:hover {
        opacity: 0.8;
    }

</style>