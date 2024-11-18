<script setup>
import { onMounted, ref, watch } from 'vue';
import { REGEX } from '@/constants/regex';

const option = ['로그인', '아이디 찾기', '비밀번호 찾기', '회원가입'];
const selectOption = ref(0); // 0: 로그인, 1: 아이디 찾기, 2: 비밀번호 찾기, 3:회원가입 
watch(selectOption, () => {
    console.log(selectOption.value);
})

const userCardPosition = ref('-960px');
const moveUserCard = () => {
    if(userCardPosition.value == '-960px') {
        userCardPosition.value = '0';
    }else if(userCardPosition.value == '0') {
        userCardPosition.value = '-960px'
    }
}

const clickLogIn = () => {
    selectOption.value = 0;
    findIdByEmail.value = '';
    findPasswordById.value = '';
    findPasswordByEmail.value = '';
    signUpId.value = '';
    signUpPassword.value = '';
    signUpPasswordCheck.value = '';
    signUpEmail.value = '';
    signUpNickname.value = '';
    signUpProfileImg.value = '';
}

const clickFindId = () => {
    selectOption.value = 1;
    id.value = '';
    password.value = '';
    findPasswordById.value = '';
    findPasswordByEmail.value = '';
    signUpId.value = '';
    signUpPassword.value = '';
    signUpPasswordCheck.value = '';
    signUpEmail.value = '';
    signUpNickname.value = '';
    signUpProfileImg.value = '';
}

const clickFindPassword = () => {
    selectOption.value = 2;
    id.value = '';
    password.value = '';
    findIdByEmail.value = '';
    signUpId.value = '';
    signUpPassword.value = '';
    signUpPasswordCheck.value = '';
    signUpEmail.value = '';
    signUpNickname.value = '';
    signUpProfileImg.value = '';
}

const clickSignUp = () => {
    selectOption.value = 3;
    id.value = '';
    password.value = '';
    findIdByEmail.value = '';
    findPasswordById.value = '';
    findPasswordByEmail.value = '';
}



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

const idValidationFlag = ref(false);
const passwordValidationFlag  = ref(false);
const emailValidationFlag = ref(false);
const nicknameValidationFlag = ref(false);

const validationMessage = ref({
    idValidation: null,
    passValidation: null,
    emailValidation: null,
    nicknameValidation: null
})

const idValidation = () => {
    if(signUpId.value) {
        if(!REGEX.id.regexr.test(signUpId.value)) {
            validationMessage.value.idValidation = REGEX.id.text;
            idValidationFlag.value = false;
        }else {
            validationMessage.value.idValidation = '사용가능한 아이디 입니다.';
            idValidationFlag.value = true;
        }
    }
}

watch(signUpId, () => {
    idValidation()
})

const passwordValidation = () => {
    if(signUpPassword.value) {
        if(!REGEX.password.regexr.test(signUpPassword.value)) {
            validationMessage.value.passValidation = REGEX.password.text;
            passwordValidationFlag.value = false;
        }else {
            if(signUpPassword.value && signUpPasswordCheck.value) {
                if(signUpPassword.value == signUpPasswordCheck.value) {
                    validationMessage.value.passValidation = '두 비밀번호가 일치합니다.'
                    passwordValidationFlag.value = true;
                }else {
                    validationMessage.value.passValidation = '두 비밀번호가 서로 일치하지 않습니다.'
                    passwordValidationFlag.value = false;
                }
            } else {
                validationMessage.value.passValidation = '사용가능한 비밀번호 입니다.';
                passwordValidationFlag.value = true;
            }
        }
    }
    console.log(passwordValidationFlag.value)
}

watch([signUpPassword, signUpPasswordCheck], () => {
    passwordValidation()
})

const emailValidation = () => {
    if(signUpEmail.value) {
        if(!REGEX.email.regexr.test(signUpEmail.value)) {
            validationMessage.value.emailValidation = REGEX.email.text;
            emailValidationFlag.value = false;
        }else {
            validationMessage.value.emailValidation = '사용가능한 이메일 입니다.';
            emailValidationFlag.value = true;
        }
    }
}

watch(signUpEmail, () => {
    emailValidation()
})

const nicknameValidation = () => {
    if(signUpNickname.value) {
        if(!REGEX.nickname.regexr.test(signUpNickname.value)) {
            validationMessage.value.nicknameValidation = REGEX.nickname.text;
            nicknameValidationFlag.value = false;
        }else {
            validationMessage.value.nicknameValidation = '사용가능한 닉네임 입니다.';
            nicknameValidationFlag.value = true;
        }
    }
}

watch(signUpNickname, () => {
    nicknameValidation()
})

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
    <div id="userCardWrap" :style="{ right: userCardPosition }">
        <div class="leftButton" v-if="userCardPosition == '-960px'" @click="moveUserCard">
            <i class="fa-solid fa-chevron-left"></i>
        </div>
        <div class="rightButton" v-if="userCardPosition == '0'" @click="moveUserCard">
            <i class="fa-solid fa-chevron-right"></i>
        </div>
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
            <input type="text" placeholder="이메일" v-model.lazy="findIdByEmail"/>
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
                <div>
                    <input type="text" placeholder="아이디" v-model.lazy="signUpId">
                    <button class="duplicateIdSubmitButton">중복 확인</button>
                </div>
                <p :class="idValidationFlag ? 'correctValidation' : 'wrongValidation'" v-if="signUpId">{{ validationMessage.idValidation }}</p>
            </div>
            <div class="signUpInputPasswordBox">
                <input type="text" placeholder="비밀번호" v-model.lazy="signUpPassword">
                <input type="text" placeholder="비밀번호 확인" v-model.lazy="signUpPasswordCheck">
                <p :class="passwordValidationFlag ? 'correctValidation' : 'wrongValidation'" v-if="signUpPassword">{{ validationMessage.passValidation }}</p>
            </div>
            <div class="signUpInputEmailBox">
                <input type="text" placeholder="이메일" v-model.lazy="signUpEmail">
                <p :class="emailValidationFlag ? 'correctValidation' : 'wrongValidation'" v-if="signUpEmail">{{ validationMessage.emailValidation }}</p>
            </div>
            
            <div class="signUpInputNicknameBox">
                <div>
                    <input type="text" placeholder="닉네임" v-model.lazy="signUpNickname">
                    <button class="duplicateNicknameSubmitButton">중복 확인</button>
                </div>
                <p :class="nicknameValidationFlag ? 'correctValidation' : 'wrongValidation'" v-if="signUpNickname">{{ validationMessage.nicknameValidation }}</p>
            </div>
            <div class="signUpInputProfileImgBox">
                <input class="profileImgValue" value="첨부파일" placeholder="프로필 이미지">
                <label for="file"></label>
                <input type="file" id="profileImgfile">
            </div>
            <button>회원가입</button>
        </div>

        <div class="selectOption">
            <div v-if="selectOption == 0">
                <h2 class="findId" @click="clickFindId()">아이디 찾기</h2>
                <h2 class="division">|</h2>
                <h2 class="findPassword" @click="clickFindPassword()">비밀번호 찾기</h2>
                <h2 class="division">|</h2>
                <h2 class="signUp" @click="clickSignUp()">회원가입</h2>
            </div>
            <div v-if="selectOption == 1">
                <h2 class="login" @click="clickLogIn()">로그인</h2>
                <h2 class="division">|</h2>
                <h2 class="findPassword" @click="clickFindPassword()">비밀번호 찾기</h2>
                <h2 class="division">|</h2>
                <h2 class="signUp" @click="clickSignUp()">회원가입</h2>
            </div>
            <div v-if="selectOption == 2">
                <h2 class="login" @click="clickLogIn()">로그인</h2>
                <h2 class="division">|</h2>
                <h2 class="findId" @click="clickFindId()">아이디 찾기</h2>
                <h2 class="division">|</h2>
                <h2 class="signUp" @click="clickSignUp()">회원가입</h2>
            </div>
            <div v-if="selectOption == 3">
                <h2 class="login" @click="clickLogIn()">로그인</h2>
                <h2 class="division">|</h2>
                <h2 class="findId" @click="clickFindId()">아이디 찾기</h2>
                <h2 class="division">|</h2>
                <h2 class="findPassword" @click="clickFindPassword()">비밀번호 찾기</h2>
            </div>
            
        </div>
        
        <hr>

        <div class="goMainPageBox">
            <h2>로그인 없는 서비스 이용</h2>
            <button class="goMainPageButton">메인페이지 바로가기</button>
        </div>
        <p class="copyRight">project Copyright &copy; 부울경 03 All Rights Reserved.</p>
    </div>
</template>

<style scoped>
    #userCardWrap {
        transition: all 1s ease-in-out;
        position: absolute;
        right: -960px;
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
    .leftButton {
        position: absolute;
        left: -60px;
        width: 60px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #3EBEEE;
        color: white;
        font-size: 80px;
        border-top-left-radius: 9px;
        border-bottom-left-radius: 9px;
        cursor: pointer;
    }
    .leftButton:hover {
        opacity: 0.8;
    }
    .rightButton {
        position: absolute;
        left: 0;
        width: 60px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #3EBEEE;
        color: white;
        font-size: 80px;
        border-top-right-radius: 9px;
        border-bottom-right-radius: 9px;
        cursor: pointer;
    }
    .rightButton:hover {
        opacity: 0.8;
    }
    .userTitle {
        font-size: 45px;
    }
    /* 로그인 */
    .loginInputBox {
        width: 600px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* align-items: center; */
    }
    .loginInputBox > input {
        box-sizing: border-box;
        padding-left: 20px;
        width: 600px;
        height: 70px;
        border: none;
        border-radius: 9px;
        font-size: 20px;
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
        font-size: 20px;
        color: #E7E9EB;
    }
    .checked::before {
        color: #3EBEEE;
    }
    .rememberBox > label {
        margin-left: 10px;
        cursor: pointer;
        font-size: 20px;
        font-weight: 600;
    }
    .loginSubmitButton {
        transition: all 0.3s;
        margin-bottom: 20px;
        width: 600px;
        height: 70px;
        border: none;
        border-radius: 9px;
        font-size: 25px;
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
    .selectOption > div {
        margin-top: 20px;
        display: flex;
    }
    .goMainPageBox {
        width: 800px;
        display: flex;
        flex-direction: column;
    }
    .goMainPageBox > h2 {
        margin-bottom: 10px
    }
    .findId, .findPassword, .signUp, .login {
        cursor: pointer;
        transition: all 0.3s;
    }
    .findId:hover, .findPassword:hover, .signUp:hover, .login:hover {
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
        height: 70px;
        border: none;
        border-radius: 9px;
        font-size: 25px;
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
        width: 600px;
        height: 70px;
        border: none;
        border-radius: 9px;
        font-size: 25px;
        margin-bottom: 25px;
    }
    .findIdSubmitButton {
        transition: all 0.3s;
        margin-bottom: 20px;
        width: 600px;
        height: 70px;
        border: none;
        border-radius: 9px;
        font-size: 25px;
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
        width: 600px;
        height: 70px;
        border: none;
        border-radius: 9px;
        font-size: 25px;
        margin-bottom: 25px;
    }
    .findPasswordSubmitButton {
        transition: all 0.3s;
        margin-bottom: 20px;
        width: 600px;
        height: 70px;
        border: none;
        border-radius: 9px;
        font-size: 25px;
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
        overflow: auto;
        width: 600px;
        display: flex;
        flex-direction: column;
    }
    .signUpInputBox input {
        box-sizing: border-box;
        padding-left: 20px;
        width: 100%;
        height: 70px;
        border: none;
        border-radius: 9px;
        font-size: 20px;
        margin-bottom: 25px;
    }
    .signUpInputBox button {
        transition: all 0.3s;
        width: 100%;
        height: 70px;
        border: none;
        border-radius: 9px;
        font-size: 20px;
        font-weight: 600;
        background-color: #3EBEEE;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        flex-shrink: 0;
    }
    .signUpInputBox button:hover {
        opacity: 0.8;
    }
    .signUpInputIdBox {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .signUpInputIdBox > div {
        display: flex;
    }
    .signUpInputIdBox > div > input {
        margin-right: 10px;
        width: 80%;
    }
    .signUpInputIdBox > div > button {
        width: 20%;
    }
    .correctValidation {
        margin-bottom: 20px;
        font-weight: 600;
        font-size: 14px;
        color: green;
    }
    .wrongValidation {
        margin-bottom: 20px;
        font-weight: 600;
        font-size: 14px;
        color: red;
    }
    .signUpInputPasswordBox {
        display: flex;
        flex-direction: column;
    }
    .signUpInputEmailBox {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .signUpInputNicknameBox {
        display: flex;
        flex-direction: column;
    }
    .signUpInputNicknameBox > div {
        display: flex;
    }
    .signUpInputNicknameBox > div > input {
        margin-right: 10px;
        width: 80%;
    }
    .signUpInputNicknameBox > div > button {
        width: 20%;
    }
    .signUpInputProfileImgBox {
        display: flex;
    }
    .profileImgValue {
        width: 80%;
    }
    .copyRight {
        margin-top: 20px;
    }
</style>