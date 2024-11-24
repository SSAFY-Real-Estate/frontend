<script setup>
import { checkNicknameCheckApi, getMyInfoApi, updateInfoApi } from '@/apis/my/my';
import { usePrincipalStore } from '@/stores/principal';
import { computed, onMounted, ref, watch } from 'vue';
import { REGEX } from '@/constants/regex';
import { ref as firebaseRef, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { storage } from '@/apis/firebase/firebaseConfig';

const principalStore = usePrincipalStore();

const user = computed(() => principalStore.user);
const userIdInfo = ref(null);
const userInfo = ref(null);

onMounted(() => {
    principalStore.fetchUser();
    userIdInfo.value = user.value.userId;
})

const showUserInfo = async(userId) => {
    try {
        const response = await getMyInfoApi(userId);
        userInfo.value = response;
    } catch (error) {
        alert("오류가 발생했습니다. 서비스를 다시 이용해주세요.");
    }
}

watch(userIdInfo, () => {
    showUserInfo(userIdInfo.value);
})

watch(userInfo, () => {
    console.log(userInfo.value)
})

const updateNickname = ref('');
const updateNicknameFlag = ref(false);

const updatePassword = ref('');
const updatePasswordCheck = ref('');
const updatePasswordFlag = ref(false);

const updateProfileImgUrl = ref('');

const validationMessage = ref({
    nicknameValidation: null,
    passValidation: null,
})

const nicknameValidation = () => {
    if(updateNickname.value) {
        if(!REGEX.nickname.regexr.test(updateNickname.value)) {
            validationMessage.value.nicknameValidation = REGEX.nickname.text;
            updateNicknameFlag.value = false;
        }else {
            validationMessage.value.nicknameValidation = '사용가능한 닉네임 입니다.';
            updateNicknameFlag.value = true;
        }
    }
}

const passwordValidation = () => {
    if(updatePassword.value) {
        if(!REGEX.password.regexr.test(updatePassword.value)) {
            validationMessage.value.passValidation = REGEX.password.text;
            updatePasswordFlag.value = false;
        }else {
            if(updatePassword.value && updatePasswordCheck.value) {
                if(updatePassword.value == updatePasswordCheck.value) {
                    validationMessage.value.passValidation = '두 비밀번호가 일치합니다.'
                    updatePasswordFlag.value = true;
                }else {
                    validationMessage.value.passValidation = '두 비밀번호가 서로 일치하지 않습니다.'
                    updatePasswordFlag.value = false;
                }
            }else {
                validationMessage.value.passValidation = '사용가능한 비밀번호 입니다.';
                updatePasswordFlag.value = true;
            }
        }
    }
}

watch(updateNickname, () => {
    nicknameValidation();
})

watch([updatePassword, updatePasswordCheck], () => {
    passwordValidation();
})

const nicknameValidationClick = async() => {
    if(updateNickname.value == '') {
        alert('닉네임을 입력해주세요');
        updateNicknameFlag.value = false;
        return;
    }

    try {
        const response = await checkNicknameCheckApi(updateNickname.value)
        if(!response) {
            alert('사용가능한 닉네임입니다.');
            updateNicknameFlag.value = true;
        }else {
            alert('이미 존재하는 닉네임입니다. 다른 닉네임을 입력해주세요.');
            updateNickname.value = '';
            updateNicknameFlag.value = false;
        }
    } catch (error) {
        alert(`오류가 발생하였습니다. 해당 서비스를 다시 이용해 주세요`);
    }
}

const nicknameUpdateEnter = (event) => {
    if(event.key === 'Enter') nicknameValidationClick();
}

const updateUserInfoClick = async() => {
    if(window.confirm('회원정보를 수정하시겠습니까?')) {
        if(!updateNicknameFlag.value) {
            alert('회원정보 수정이 유효하지 않습니다. 다시 회원정보 수정을 해주세요.');
            return;
        }else {
            userInfo.value.nickname = updateNickname.value;
            userInfo.value.password = updatePassword.value;
            try {
                const response = await updateInfoApi({
                    userId: userInfo.value.userId,
                    password: userInfo.value.password,
                    nickname: userInfo.value.nickname,
                    profileImgUrl: userInfo.value.profileImgUrl
                })
                window.location.reload();
            } catch (error) {
                alert('오류가 발생하였습니다. 해당 서비스를 다시 이용해 주세요');
            }
        }
    }
}

const updateUserInfoEnter = (event) => {
    if(event.key == 'Enter') {
        updateUserInfoClick();
    }
}

// 파이어베이스 프로필 이미지 업로드
const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if(files.length == 0) {
        e.target.value = '';
        return;
    }

    if(!window.confirm('파일을 업로드 하시겠습니까?')) {
        e.target.value = '';
        return;
    }

    const file = files[0];

    const storageRef = firebaseRef(storage, `home/profileImgUrl/${uuid()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
        'state_changed',
        snapshot => {},
        error => {},
        () => {
            alert('프로필 이미지 업로드를 완료하였습니다.');
            getDownloadURL(storageRef)
            .then(url => {
                userInfo.value.profileImgUrl = url;
            })
        }
    );
}

</script>

<template>
    <div id="myWrap">
        <h1>마이페이지</h1>
        <div class="userInfoBox">
            <div class="profileImgBox">
                <div class="profileImgView">
                    <div v-if="userInfo?.profileImgUrl==''" class="defaultProfile">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <img v-if="userInfo?.profileImgUrl!=''" :src="userInfo?.profileImgUrl" alt="profileImgUrl">
                </div>
                <input class="fileInput" type="file" @change="handleFileChange">
            </div>
            <div class="newNicknameBox">
                <div>
                    <input type="text" @keyup="nicknameUpdateEnter" v-model="updateNickname" placeholder="변경할 닉네임">
                    <button class="idCheckButton" @click="nicknameValidationClick">중복확인</button>
                </div>
                <p :class="updateNicknameFlag ? 'correct' : 'fail'" v-if="updateNickname">{{ validationMessage.nicknameValidation }}</p>
            </div>
            <div class="showIdBox">
                <input type="text" :value="user?.id" disabled class="showId">
            </div>
            <div class="newPasswordBox">
                <input type="password" v-model="updatePassword" class="newPassword" placeholder="변경할 비밀번호">
                
            </div>
            <div class="newPasswordCheckBox">
                <input type="password" @keyup="updateUserInfoEnter" v-model="updatePasswordCheck" class="newPasswordCheck" placeholder="변경할 비밀번호 확인">
                <p :class="updatePasswordFlag ? 'correct' : 'fail'" v-if="updatePassword">{{ validationMessage.passValidation }}</p>
            </div>
            <div class="emailBox">
                <input type="text" :value="userInfo?.email" class="emailInfo" disabled>
            </div>
            <div class="buttonBox">
                <button class="updateUserInfoButton" @click="updateUserInfoClick">회원정보 수정</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #myWrap {
        width: 1400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    h1 {
        width: 100%;
        margin-bottom: 50px;
        font-size: 50px;
    }
    .userInfoBox {
        width: 960px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 0 auto;
    }
    img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }
    .defaultProfile {
        width: 200px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 100px;
        border: 1px solid #ccc;
        border-radius: 50%;
    }
    .profileImgBox {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-bottom: 20px;
    }
    .fileInput {
        padding-left: 180px;
    }
    .newNicknameBox {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        flex-direction: column;
    }
    .newNicknameBox > div {
        display: flex;
        gap: 10px;
        width: 600px;
    }
    .newNicknameBox > div > input {
        width: 80%;
        height: 80px;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 9px;
        border: 1px solid #ccc;
        font-size: 20px;
    }
    .newNicknameBox > div > button {
        width: 20%;
        height: 80px;
        border-radius: 9px;
        background-color: #3ebeee;
        transition: all 0.3s;
        border: none;
        font-size: 20px;
        cursor: pointer;
    }
    .newNicknameBox > div > button:hover {
        opacity: 0.8;
    }
    .newNicknameBox > p {
        margin: 10px 0;
        width: 600px;
    }
    .correct {
        color: green;
    }
    .fail {
        color: red;
    }
    .showIdBox {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
    }
    .showIdBox > input {
        width: 600px;
        height: 80px;
        border-radius: 9px;
        border: 1px solid #ccc;
        font-size: 20px;
        padding: 10px;
        box-sizing: border-box;
    }
    .newPasswordBox {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-bottom: 10px;
    }
    .newPasswordBox > input {
        width: 600px;
        height: 80px;
        border-radius: 9px;
        border: 1px solid #ccc;
        font-size: 20px;
        padding: 10px;
        box-sizing: border-box;
    }
    .newPasswordCheckBox > p {
        width: 600px;
        margin: 10px 0;
    }
    .newPasswordCheckBox {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-bottom: 10px;
    }
    .newPasswordCheckBox > input {
        width: 600px;
        height: 80px;
        border-radius: 9px;
        border: 1px solid #ccc;
        font-size: 20px;
        padding: 10px;
        box-sizing: border-box;
    }
    .emailBox {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
    }
    .emailBox > input {
        width: 600px;
        height: 80px;
        border-radius: 9px;
        border: 1px solid #ccc;
        font-size: 20px;
        padding: 10px;
        box-sizing: border-box;
    }
    .buttonBox {
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .updateUserInfoButton {
        width: 600px;
        height: 80px;
        background-color: #3ebeee;
        border: none;
        border-radius: 9px;
        font-size: 20px;
        transition: all 0.3s;
        cursor: pointer;
    }
    .updateUserInfoButton:hover {
        opacity: 0.8;
    }
</style>