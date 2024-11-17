<script setup>

</script>

<template>
    <div id="userCardWrap">
        <h1 class="userTitle">로그인</h1>
        <div class="loginInputBox">
            <input type="text" placeholder="아이디">
            <input type="password" placeholder="비밀번호">
            <div class="rememberBox">
                <input type="checkbox" id="remember">
                <label for="remember">로그인 정보 기억하기</label>
            </div>
            <button class="loginSubmitButton">로그인</button>
        </div>

        <div class="selectOption">
            <h2 class="findId">아이디 찾기</h2>
            <h2 class="division">|</h2>
            <h2 class="findPassword">비밀번호 찾기</h2>
            <h2 class="division">|</h2>
            <h2 class="signUp">회원가입</h2>
        </div>
        
        <hr>

        <div class="goMainPageBox">
            <h2>로그인 없는 서비스 이용</h2>
            <button class="goMainPageButton">메인페이지 바로가기</button>
        </div>
        <p>project Copyright &copy; 부울경 03 All Rights Reserved.</p>
    </div>
</template>

<style scoped>
    #userCardWrap {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        background-color: #E7E9EB;
        position: absolute;
        width: 960px;
        height: 100%;
        border-top-left-radius: 9px;
        border-bottom-left-radius: 9px;
        top: 0;
    }
    .userTitle{
        font-size: 80px;
    }
    .loginInputBox {
        display: flex;
        flex-direction: column;
    }
    .loginInputBox > input {
        box-sizing: border-box;
        padding-left: 20px;
        width: 800px;
        height: 100px;
        border: none;
        border-radius: 9px;
        font-size: 30px;
        margin-bottom: 25px;
    }
    .rememberBox {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }
    [type="checkbox"] {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        appearance: none;
        box-sizing: border-box;
        background-clip: content-box;
        width: 40px;
        height: 40px;
        background-color: white;
        border-radius: 50%;
        cursor: pointer;
    }
    [type="checkbox"]::before {
        content:'✔';
        color: #E7E9EB;
        font-size: 30px;
    }
    [type="checkbox"]:checked::before {
        color: #3EBEEE;
    }
    .rememberBox > label {
        cursor: pointer;
        padding-top: 10px;
        font-size: 25px;
        font-weight: 600;
    }
    .loginSubmitButton {
        transition: all 0.3s;
        margin-bottom: 20px;
        width: 800px;
        height: 100px;
        border: none;
        border-radius: 9px;
        font-size: 30px;
        font-weight: 600;
        background-color: #3EBEEE;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .loginSubmitButton:hover {
        opacity: 0.8;
    }
    .selectOption {
        display: flex;
    }
    .goMainPageBox {
        width: 800px;
        display: flex;
        flex-direction: column;
    }
    .findId, .findPassword, .signUp {
        cursor: pointer;
        transition: all 0.3s;
    }
    .findId:hover, .findPassword:hover, .signUp:hover {
        text-decoration: underline;
    }
    .division {
        margin: 0 10px;
    }
    hr {
    width: 800px;
    border: none;
    height: 2px;
    background-color: #ccc;
    margin: 20px 0;
    }
    .goMainPageButton {
        width: 100%;
        height: 100px;
        border: none;
        border-radius: 9px;
        font-size: 30px;
        font-weight: 600;
        background-color: #3EBEEE;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .goMainPageButton:hover {
        opacity: 0.8;
    }
</style>