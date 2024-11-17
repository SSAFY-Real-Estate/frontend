<script setup>
import { onMounted, ref, watch } from 'vue';
import { REGEX } from '@/constants/regex';

const option = ['로그인', '아이디 찾기', '비밀번호 찾기', '회원가입'];
const selectOption = ref(0); // 0: 로그인, 1: 아이디 찾기, 2: 비밀번호 찾기, 3:회원가입 
watch(selectOption, () => {
    console.log(selectOption.value);
})

// 0: 로그인
const id = ref("");
const password = ref("");
watch((id, password), () => {
    console.log('id : ' + id.value);
    console.log('password : ' + password.value);
})
const rememberId = ref(false);
watch(rememberId, () => {
    console.log(rememberId.value);
    if(rememberId.value) {
        if(!id.value) {
            alert('로그인 정보를 기억할 아이디를 입력해주세요')
            rememberId.value = false;
        }else if(id.value){
            localStorage.setItem('id', id.value);
        }
    }else if(!rememberId.value) {
        localStorage.removeItem('id');
    }
})

// 1: 아이디 찾기
const findIdByEmail = ref('');
watch(findIdByEmail, () => {
    console.log(findIdByEmail.value)
})

// 2: 비밀번호 찾기
const findPasswordById = ref('');
const findPasswordByEmail = ref('');
watch((findPasswordById, findPasswordById), () => {
    console.log('findPasswordById : ' + findPasswordById.value)
    console.log('findPasswordByEmail : ' + findPasswordByEmail.value)
})

// 3: 회원가입
const signUpId = ref('');
const signUpPassword = ref('');
const signUpPasswordCheck = ref('');
const signUpEmail = ref('');
const signUpNickname = ref('');
const signUpProfileImg = ref('');

const validationMessage = ref({
    idValidation: '',
    passValidation: '',
    emailValidation: '',
    nicknameValidation: ''
})

const idValidation = (signUpId) => {
    if(!REGEX.id.regexr.test(signUpId.value)) {
        validationMessage.value.idValidation = REGEX.id.text;
    }else {
        validationMessage.value.idValidation = '사용가능한 아이디 입니다.';
    }
}

watch(signUpId, idValidation)

// 초기화 로직
onMounted(() => {
    const savedId = localStorage.getItem('id');
    if(savedId) {
        id.value = savedId;
        rememberId.value = true;
    }
})

</script>

<template>
    <div id="userCardWrap">
        <h1 class="userTitle">{{ option[selectOption] }}</h1>

        <!-- 로그인 -->
        <div class="loginInputBox" v-if="selectOption == 0">
            <input type="text" placeholder="아이디" v-model.lazy="id">
            <input type="password" placeholder="비밀번호" v-model.lazy="password">
            <div class="rememberBox">
                <input type="checkbox" id="remember" :class="{ 'checked': rememberId }" v-model="rememberId"/>
                <label for="remember">로그인 정보 기억하기</label>
            </div>
            <button class="loginSubmitButton">로그인</button>
        </div>

        <!-- 아이디 찾기 -->
        <div class="findIdInputBox" v-if="selectOption == 1">
            <input type="text" placeholder="이메일" v-model.lazy="findIdByEmail">
            <span v-if="validationMessage.idValidation">{{ validationMessage.idValidation }}</span>
            <button class="findIdSubmitButton">아이디 찾기</button>
        </div>

        <!-- 비밀번호 찾기 -->
        <div class="findPasswordInputBox" v-if="selectOption == 2">
            <input type="text" placeholder="아이디" v-model.lazy="findPasswordById">
            <input type="text" placeholder="이메일" v-model.lazy="findPasswordByEmail">
            <button class="findPasswordSubmitButton">비밀번호 찾기</button>
        </div>

        <!-- 회원가입 -->
        <div class="signUpInputBox" v-if="selectOption == 3">
            <div class="signUpInputIdBox">
                <input type="text" placeholder="아이디" v-model.lazy="signUpId">
                <span v-if="!REGEX.id.regexr.test(signUpId)">{{ REGEX.id.text }}</span>
                <button class="duplicateIdSubmitButton">중복 확인</button>
            </div>
            <input type="text" placeholder="비밀번호" v-model.lazy="signUpPassword">
            <input type="text" placeholder="비밀번호 확인" v-model.lazy="signUpPasswordCheck">
            <input type="text" placeholder="이메일" v-model.lazy="signUpEmail">
            <div class="signUpInputNicknameBox">
                <input type="text" placeholder="닉네임" v-model.lazy="signUpNickname">
                <button class="duplicateNicknameSubmitButton">중복 확인</button>
            </div>
            <div class="signUpInputProfileImgBox">
                <input class="profileImgValue" value="첨부파일" placeholder="프로필 이미지">
                <label for="file"></label>
                <input type="file" id="profileImgfile">
            </div>
            <button>회원가입</button>
        </div>

        <div class="selectOption">
            <h2 class="findId" @click="selectOption = 1">아이디 찾기</h2>
            <h2 class="division">|</h2>
            <h2 class="findPassword" @click="selectOption = 2">비밀번호 찾기</h2>
            <h2 class="division">|</h2>
            <h2 class="signUp" @click="selectOption = 3">회원가입</h2>
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
    /* 로그인 */
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
        appearance: none;
        width: 40px;
        height: 40px;
        background-color: white;
        border: 2px solid #ccc;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s;
    }
    [type="checkbox"]::before {
        content: '✔';
        font-size: 30px;
        color: #E7E9EB;
    }
    .checked::before {
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

    /* 아이디 찾기 */
    .findIdInputBox {
        display: flex;
        flex-direction: column;
    }
    .findIdInputBox > input {
        box-sizing: border-box;
        padding-left: 20px;
        width: 800px;
        height: 100px;
        border: none;
        border-radius: 9px;
        font-size: 30px;
        margin-bottom: 25px;
    }
    .findIdSubmitButton {
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
    .findIdSubmitButton:hover {
        opacity: 0.8;
    }

    /* 비밀번호 찾기 */
    .findPasswordInputBox {
        display: flex;
        flex-direction: column;
    }
    .findPasswordInputBox > input {
        box-sizing: border-box;
        padding-left: 20px;
        width: 800px;
        height: 100px;
        border: none;
        border-radius: 9px;
        font-size: 30px;
        margin-bottom: 25px;
    }
    .findPasswordSubmitButton {
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
    .findPasswordSubmitButton:hover {
        opacity: 0.8;
    }
    /* 회원가입 */
    .signUpInputBox {
        width: 800px;
        display: flex;
        flex-direction: column;
    }
    .signUpInputBox input {
        box-sizing: border-box;
        padding-left: 20px;
        height: 100px;
        border: none;
        border-radius: 9px;
        font-size: 30px;
        margin-bottom: 25px;
    }
    .signUpInputBox button {
        transition: all 0.3s;
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
    .signUpInputBox button:hover {
        opacity: 0.8;
    }
    .signUpInputIdBox {
        display: flex;
    }
    .signUpInputIdBox > input {
        margin-right: 10px;
        width: 80%;
    }
    .signUpInputIdBox > button {
        width: 20%;
    }
    .signUpInputNicknameBox {
        display: flex;
    }
    .signUpInputNicknameBox > input {
        margin-right: 10px;
        width: 80%;
    }
    .signUpInputNicknameBox > button {
        width: 20%;
    }
    .signUpInputProfileImgBox {
        display: flex;
    }
    .profileImgValue {
        width: 80%;
    }
</style>