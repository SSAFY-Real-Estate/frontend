<script setup>
import Header from './components/header/Header.vue';
import MainView from './views/MainView.vue';
import StartView from './views/StartView.vue';
</script>

<!-- 1920 X 1080 해상도 기준 -->
<template>
    <div id="wrap">
        <!-- <StartView /> -->
        <Header/>
        <MainView/>
    </div>
</template>

<style>
    #wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    }
</style>