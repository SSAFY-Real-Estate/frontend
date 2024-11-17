<script setup>
import UserCard from '@/components/UserCard.vue';


</script>

<template>
    <div id="startViewWrap">
        <div class="startLogo">
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
        padding-top: 50px;
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
    }
    .startLogo > img {
        width: 700px;
    }
    .background {
        padding-top: 100px;
        width: 1920px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .background > img {
        width: 100%;
    }
</style>