import instance from "../utils/instance";
// 로그인


// 아이디 찾기
export const findIdByEmailApi = async (email) => {
    const response = await instance.get('/user/findid', {
        params: {
            email: email
        }
    });
    return response.data;
}

// 비밀번호 찾기(메일 임시 비밀번호 재발급)
export const findPasswordByIdAndEmailApi = async (data) => {
    const response = await instance.post('/user/findpassword', data);
    return response.data;
}

// 아이디 중복 확인
export const checkIdDuplicatedApi = async (id) => {
    const response = await instance.get('/user/idcheck', {
        params: {
            id: id
        }
    });
    return response.data;
}

// 닉네임 중복 확인
export const checkNicknameDuplicatedApi = async (nickname) => {
    const response = await instance.get('/user/nicknamecheck', {
        params: {
            nickname: nickname
        }
    })
    return response.data;
}

// 회원가입
export const signUpApi = async (data) => {
    const response = await instance.post('/user/signup', data);
    return response.data;
}

// 로그인
export const signInApi = async (data) => {
    const response = await instance.post('/user/signin', data);
    return response.data;
}