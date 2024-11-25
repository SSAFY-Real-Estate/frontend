<script setup>
import { useRouter } from 'vue-router';
// import NoticeTable from '@/components/board/NoticeTable.vue';
import NoticeMainCard from '@/components/board/NoticeMainCard.vue';
const router = useRouter();
</script>
<template>
    <div id="mainViewWrap">
        <div class="top">

            <div class="mainLeft">
                <div class="mainLeftTop">
                    <div class="oneTwoRoom" @click="router.push({name: 'map'})">
                        <h1>원/투룸</h1>
                        <p>주택/빌라, 오피스텔, 아파트까지<br> 모든 전월세 매물을 한번에!</p>
                        <div class="roomLogoBox">
                            <img src="../assets/roomLogo.png" alt="roomLogo">
                        </div>
                    </div>
                    <div class="apart" @click="router.push({name: 'map'})">
                        <h1>아파트</h1>
                        <p>가장 빠른 실거래가 알림!<br>풍부한 단지정보 및 실시간 랭킹까지!</p>
                        <div class="apartLogoBox">
                            <img src="../assets/apartLogo.png" alt="apartLogo">
                        </div>
                    </div>
                </div>
                <div class="mainLeftBottom">
                    <div class="house" @click="router.push({name: 'map'})">
                        <h1>주택/빌라</h1>
                        <p>전월세부터<br>매매까지<br>모~든 매물!</p>
                        <div class="houseLogoBox">
                            <img src="../assets/houseLogo.png" alt="houseLogo">
                        </div>
                    </div>
                    <div class="officetel" @click="router.push({name: 'map'})">
                        <h1>오피스텔</h1>
                        <p>다양한 정보와<br>다양한 매물!</p>
                        <div class="officetelLogoBox">
                            <img src="../assets/OfficetelLogo.png" alt="officetelLogo">
                        </div>
                    </div>
                    <div class="adoptation" @click="router.push({name: 'map'})">
                        <h1>분양</h1>
                        <p>전국의 모든<br>분양/입주 정보<br>확인 가능!</p>
                        <div class="adoptationLogoBox">
                            <img src="../assets/adoptationLogo.png" alt="adoptationLogo">
                        </div>
                    </div>
                </div>
            </div>
            <div class="mainRight">
                <div class="mainRightTop">
                    <div class="news">
                        <h1>부동산 최근 뉴스를 한번에!</h1>
                        <div class="newsLogoBox">
                            <img src="../assets/newsLogo.png" alt="newsLogo">
                        </div>
                    </div>
                </div>
                <div class="mainRightBottom">
                    <div class="myList">
                        <h1>찜</h1>
                        <div class="myListBox">
                            <img src="../assets/myListLogo.png" alt="myListLogo">
                        </div>
                    </div>
                    <div class="putHouse" @click="router.push({name : 'board'})">
                        <h1>방내놓기</h1>
                        <div class="putHouseBox">
                            <img src="../assets/putHouseLogo.png" alt="putHouseLogo">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <NoticeMainCard/>
        </div>
    </div>
</template>
<style scoped>
    #mainViewWrap {
        width: 1400px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .top {
        display: flex;
        gap: 10px;
    }
    .mainLeft {
        display: flex;
        flex-direction: column;
        width: 65%;
    }
    .mainLeftTop {
        display: flex;
        height:250px;
        justify-content: space-between;
        width: 100%;
        gap: 10px;
    }
    .oneTwoRoom {
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        box-shadow: inset;
        padding: 20px 20px;
        display: flex;
        flex-direction: column;
        width: 50%;
        border-radius: 9px;
        border: 1px solid #ddd;
        cursor: pointer;
    }
    .oneTwoRoom:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    .oneTwoRoom > h1 {
        margin-bottom: 10px;
    }
    .oneTwoRoom > p {
        margin-bottom: 20px;
    }
    .roomLogoBox {
        display: flex;
        justify-content: end;
    }
    .oneTwoRoom > div > img {
        width: 100px;
    }
    .apart {
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        box-shadow: inset;
        padding: 20px 20px;
        display: flex;
        flex-direction: column;
        width: 50%;
        border-radius: 9px;
        border: 1px solid #ddd;
        cursor: pointer;
    }
    .apart:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    .apart > h1 {
        margin-bottom: 10px;
    }
    .apart > p {
        margin-bottom: 20px;
    }
    .apartLogoBox {
        display: flex;
        justify-content: end;
    }
    .apart > div > img {
        width: 100px;
    }
    .mainLeftBottom {
        margin-top: 10px;
        display: flex;
        height:250px;
        justify-content: space-between;
        width: 100%;
        gap: 10px;
    }
    .house {
        width: 33%;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        padding: 20px 20px;
        display: flex;
        flex-direction: column;
        border-radius: 9px;
        border: 1px solid #ddd;
        cursor: pointer;
    }
    .house:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    .house > h1 {
        margin-bottom: 10px;
    }
    .house > p {
        margin-bottom: 20px;
    }
    .houseLogoBox {
        display: flex;
        justify-content: end;
    }
    .house > div > img {
        width: 100px;
    }

    .officetel {
        width: 33%;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        padding: 20px 20px;
        display: flex;
        flex-direction: column;
        border-radius: 9px;
        border: 1px solid #ddd;
        cursor: pointer;
    }
    .officetel:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    .officetel > h1 {
        margin-bottom: 10px;
    }
    .officetel > p {
        margin-bottom: 20px;
    }
    .officetelLogoBox {
        padding-top: 25px;
        display: flex;
        justify-content: end;
    }
    .officetel > div > img {
        width: 100px;
    }

    .adoptation {
        width: 33%;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        padding: 20px 20px;
        display: flex;
        flex-direction: column;
        border-radius: 9px;
        border: 1px solid #ddd;
        cursor: pointer;
    }
    .adoptation:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    .adoptation > h1 {
        margin-bottom: 10px;
    }
    .adoptation > p {
        margin-bottom: 20px;
    }
    .adoptationLogoBox {
        display: flex;
        justify-content: end;
    }
    .adoptation > div > img {
        width: 95px;
    }
    .mainRight {
        width: 35%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .mainRightTop {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .news {
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        padding: 20px 20px;
        /* height: 70%; */
        display: flex;
        flex-direction: column;
        border-radius: 9px;
        border: 1px solid #ddd;
        cursor: pointer;
    }
    .news:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    .newsLogoBox > img {
        width: 200px;
    }

    .news > h1 {
        margin-bottom: 80px;
    }
    .newsLogoBox {
        display: flex;
        justify-content: end;
    }
    .mainRightBottom {
        width: 100%;
        display: flex;
        gap: 10px;
        
    }
    .myList {
        width: 50%;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        padding: 20px 20px;
        height: 198px;
        display: flex;
        flex-direction: column;
        border-radius: 9px;
        border: 1px solid #ddd;
        cursor: pointer;
        box-sizing: border-box;
    }
    .myList:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    .myList > h1 {
        margin-bottom: 35px;
    }
    .myListBox > img {
        width: 100px;
    }
    .myListBox {
        display: flex;
        justify-content: end;
    }
    .putHouse {
        width: 50%;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        padding: 20px 20px;
        height: 198px;
        display: flex;
        flex-direction: column;
        border-radius: 9px;
        border: 1px solid #ddd;
        cursor: pointer;
        box-sizing: border-box;
    }
    .putHouse:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    .putHouse > h1 {
        margin-bottom: 35px;
    }
    .putHouseBox > img {
        width: 100px;
    }
    .putHouseBox {
        display: flex;
        justify-content: end;
    }

    .putHouse {
        width: 50%;
    }

</style>