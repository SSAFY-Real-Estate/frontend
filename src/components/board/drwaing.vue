<script setup></script>

<template>
  <div class="apt_main">
    <div class="apt_py">33평</div>
    <div class="apt_price">2.5억</div>
  </div>
</template>

<style scoped>
.apt_main {
  box-sizing: border-box;
  border: 2px solid #3ebeee;
  border-radius: 5px;
  width: 50px;
  height: 50px;
  overflow: hidden;
}

.apt_py {
  box-sizing: border-box;
  font-size: 11px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3ebeee;
  border-bottom: #3ebeee;
  height: 50%;
}

.apt_price {
  height: 50%;
  box-sizing: border-box;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
