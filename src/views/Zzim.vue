<script setup>
import { getHomes } from '@/apis/ai/ai';
import { usePrincipalStore } from '@/stores/principal';
import { ref } from 'firebase/storage';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const principalStore = usePrincipalStore();

const user = computed(() => principalStore.user);

const apartInfo = ref([]);

const aiAnswer = ref(null);

const aiCommand = async() => {
    try {
        const response = await getHomes(apartInfo);
        console.log(response);
        aiCommand.value = response;
    } catch (error) {
        
    }
}

onMounted(() => {
    principalStore.fetchUser();
    console.log(user.value)
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
            <div class="aiButton">
                <i class="fa-solid fa-robot"></i>
            </div>
        </div>
        <div class="zzimList">
            <div class="zzimCard">
                <div>aptName</div>
                <div>address</div>
                <div>category</div>
                <div>priceAndPyung</div>
            </div>
            <div class="zzimCard">
                <div>aptName</div>
                <div>address</div>
                <div>category</div>
                <div>priceAndPyung</div>
            </div>
            <div class="zzimCard">
                <div>aptName</div>
                <div>address</div>
                <div>category</div>
                <div>priceAndPyung</div>
            </div>
            <div class="zzimCard">
                <div>aptName</div>
                <div>address</div>
                <div>category</div>
                <div>priceAndPyung</div>
            </div>
            <div class="zzimCard">
                <div>aptName</div>
                <div>address</div>
                <div>category</div>
                <div>priceAndPyung</div>
            </div>
            <div class="zzimCard">
                <div>aptName</div>
                <div>address</div>
                <div>category</div>
                <div>priceAndPyung</div>
            </div>
            <div class="zzimCard">
                <div>aptName</div>
                <div>address</div>
                <div>category</div>
                <div>priceAndPyung</div>
            </div>
            <div class="zzimCard">
                <div>aptName</div>
                <div>address</div>
                <div>category</div>
                <div>priceAndPyung</div>
            </div>
            <div class="zzimCard">
                <div>aptName</div>
                <div>address</div>
                <div>category</div>
                <div>priceAndPyung</div>
            </div>
            <div class="zzimCard">
                <div>aptName</div>
                <div>address</div>
                <div>category</div>
                <div>priceAndPyung</div>
            </div>
            <div class="zzimCard">
                <div>aptName</div>
                <div>address</div>
                <div>category</div>
                <div>priceAndPyung</div>
            </div>
            <div class="zzimCard">
                <div>aptName</div>
                <div>address</div>
                <div>category</div>
                <div>priceAndPyung</div>
            </div>
            <div class="zzimCard">
                <div>aptName</div>
                <div>address</div>
                <div>category</div>
                <div>priceAndPyung</div>
            </div>
            <div class="zzimCard">
                <div>aptName</div>
                <div>address</div>
                <div>category</div>
                <div>priceAndPyung</div>
            </div>
        </div>
        <div class="aiComment">
            
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
        box-sizing: border-box;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        display: flex;
        justify-content: center;
        align-items: center;
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
        width: 300px;
        height: 200px;
        border-radius: 9px;
        border: 1px solid #ddd;
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
</style>