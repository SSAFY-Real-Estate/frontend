<script setup>
import UserCard from '@/components/start/UserCard.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<template>
    <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    />
    <div id="startViewWrap">
        <div class="startLogo" @click="router.push({name : 'main'})">
            <img src="../assets/startLogo.png" alt="startLogo">
        </div>
        <div class="background">
            <img src="../assets/startBackground.png" alt="startBackground">
        </div>
        <UserCard />
    </div>
</template>

<style scoped>
    #startViewWrap {
        padding-top: 100px;
        width: 1920px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .startLogo {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .startLogo > img {
        width: 30%;
    }
    .background {
        padding-top: 100px;
        width: 1920px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .background > img {
        width: 60%;
    }
</style>