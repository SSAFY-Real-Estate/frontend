<script setup>
import { getHomes } from '@/apis/ai/ai';
import { deleteZzimApi, getZzims } from '@/apis/zzim/zzim';
import { usePrincipalStore } from '@/stores/principal';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const principalStore = usePrincipalStore();

const user = computed(() => principalStore.user);

const apartInfo = ref([]);

const aiAnswer = ref(null);
const aiButton = ref(false);

const zzimInfos = ref(null);

const getZzimData = async() => {
    try {
        const response = await getZzims(user.value.userId);
        zzimInfos.value = response;
        console.log(response)
    } catch (error) {
        
    }
}


const aiCommand = async() => {
    if(window.confirm('ai 추천 서비스를 이용하시겠습니까?')) {
        try {
        const response = await getHomes(zzimInfos.value);
        console.log(response);
        aiAnswer.value = response.apart;
        aiButton.value = true;
        } catch (error) {       
        }
    }
}

const deleteZzim = async(item) => {
    if(window.confirm("해당 찜 요소를 삭제하시겠습니까?")) {
        try {
            const response = await deleteZzimApi(item.lat, item.lng, user.value.userId);
            alert('삭제가 완료되었습니다.');
            getZzimData();
        } catch (error) {
            
        }
    }
}

onMounted(async() => {
    principalStore.fetchUser();
    console.log(user.value)
    await getZzimData(user.value.userId)
})

</script>

<template>
    <div id="zzimWrap">
        <div class="myList">
            <div class="borLeft">
                <div class="myListBox">
                    <img src="../assets/myListLogo.png" alt="myListLogo">
                </div>
                <h1>찜</h1>
            </div>
            <div class="aiButton" @click="aiCommand">
                <i class="fa-solid fa-robot"></i>
            </div>
        </div>
        <div class="zzimList">
            <div class="zzimCard" v-for="(item, index) in zzimInfos" :key="index">
                <h1>{{ item.aptName }}</h1>
                <div>{{ item.sidoName }} {{ item.gugunName }} {{ item.dongName }}</div>
                <div>분류 : {{ item.className == "apt" ? "아파트" : "" }}</div>
                <h2>{{ item.dealAmount }}억 ({{ item.pyung }}평)</h2>
                <button @click="deleteZzim(item)" class="aiButtonAnswer"><i class="fa-solid fa-x"></i></button>
            </div>
        </div>
        <div class="aiComment" v-if="aiAnswer">
            <div class="aiWrap">
                <div class="aiTitle">
                    <h1>AI 추천</h1>
                    <i class="aiTitleLogo fa-solid fa-robot"></i>
                </div>
                <div class="aptName">{{ aiAnswer?.aptName }}</div>
                <div class="address">{{ aiAnswer?.sidoName }} {{ aiAnswer?.gugunName }} {{ aiAnswer?.dongName }}</div>
                <div class="category">분류 : {{ aiAnswer?.className == "apt" ? "아파트" : "" }}</div>
                <div class="price">{{ aiAnswer?.dealAmount }}억  ({{ aiAnswer?.pyung }}평)</div>
                <div class="reason">{{ aiAnswer?.reason }}</div>
                <button @click="aiAnswer = null" class="aiCloseBtn"><i class="fa-solid fa-x"></i></button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #zzimWrap {
        position: relative;
        width: 1400px;
        display: flex;
        flex-direction: column
    }
    .myList {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .borLeft {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .myListBox {
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px
    }
    .myListBox > img {
        width: 100%;
    }
    .zzimList {
        gap: 10px;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 600px;
        border: 1px solid #ddd;
        border-radius: 9px;
        box-sizing: border-box;
        padding: 20px;
        overflow: auto;
    }
    .zzimCard {
        position: relative;
        box-sizing: border-box;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex-direction: column;
        /* gap: 10px; */
        cursor: pointer;
        width: 260px;
        height: 260px;
        /* background-color: aquamarine; */
        border-radius: 9px;
        border: 1px solid #ddd;
    }
    .zzimCard:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    .aiComment {
        width: 1200px;
        height: 500px;
        border-radius: 9px;
        border: 1px solid #ddd;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -250px;
        margin-left: -600px;
        z-index: 999999;
        background-color: #eee;
    }

    .aiButton {
        cursor: pointer;
        color:#3EBEEE;
        font-size: 35px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        border: 1px solid #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 20px;
        box-sizing: border-box;
        width: 55px;
        height: 55px;
        border-radius: 50%
    }
    .aiButton:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    .aiButtonAnswer {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  border: 1px solid #ddd;
  width: 35px;
  height: 35px;
  background-color: #3EBEEE;
  font-size: 25px;
  color: white;
  border-radius: 50%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.aiButtonAnswer:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
.aiWrap {
    position: relative;
    box-sizing: border-box;
    padding: 10px;
}
.aiTitle {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    position: relative;
}
.aiTitleLogo {
    margin-left: 10px;
    font-size: 40px;
    color: #3EBEEE;
}
.aiCloseBtn {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    border: 1px solid #ddd;
    width: 35px;
    height: 35px;
    background-color: #3EBEEE;
    font-size: 25px;
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 5px;
}
.aiCloseBtn:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
</style>