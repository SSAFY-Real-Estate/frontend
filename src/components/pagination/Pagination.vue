<script setup>
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router'; // Vue Router 사용

const props = defineProps({
    path: String, // URL (이제 사용하지 않음, Vue Router로 이동)
    option: Number, // 옵션: 0 - 최신순, 1 - 트렌딩
    count: { // 한 페이지에 보여줄 데이터 수
        type: Number,
        required: true,
        default: 15, // 기본값
    },
    totalCount: { // 총 데이터 수
        type: Number,
        required: true,
        default: 0, // 기본값
    },
});

// 현재 페이지(default: 1)
const currentPageNumber = ref(1);

// 총 페이지 수 계산 (props.count가 0이면 1로 처리)
const pageCount = computed(() => {
    const totalPages = props.count > 0 ? Math.ceil(props.totalCount / props.count) : 1;
    return totalPages;
});

// 페이지 번호 배열 생성
const pageNumbers = computed(() => {
    const pageGroupSize = 10; // 페이지 그룹 크기
    const currentGroupStart = Math.floor((currentPageNumber.value - 1) / pageGroupSize) * pageGroupSize + 1;
    const currentGroupEnd = Math.min(currentGroupStart + pageGroupSize - 1, pageCount.value);

    // 페이지 번호 배열 생성
    const numbers = [];
    for (let i = currentGroupStart; i <= currentGroupEnd; i++) {
        numbers.push(i);
    }
    return numbers;
});

// Vue Router를 통해 페이지 이동
const router = useRouter();

// 페이지 변경 함수
const changePage = (page) => {
    // 페이지가 유효 범위인지 확인
    if (page >= 1 && page <= pageCount.value) {
        currentPageNumber.value = page;
        // Vue Router로 페이지 변경
        router.push({ path: props.path, query: { page, option: props.option } });
    }
};
</script>

<template>
    <div id="paginationWrap">
        <div class="pageNumbers">
            <!-- 이전 버튼 -->
            <button
                class="pageButton"
                v-show="currentPageNumber !== 1"
                @click="changePage(currentPageNumber - 1)"
            >
                &#60;
            </button>
            <!-- 페이지 번호 버튼 -->
            <button
                class="pageButton"
                v-for="page in pageNumbers"
                :key="page"
                :class="{ active: currentPageNumber === page }"
                @click="changePage(page)"
            >
                {{ page }}
            </button>
            <!-- 다음 버튼 -->
            <button
                class="pageButton"
                v-show="currentPageNumber !== pageCount"
                @click="changePage(currentPageNumber + 1)"
            >
                &#62;
            </button>
        </div>
    </div>
</template>

<style scoped>
#paginationWrap {
    display: flex;
    justify-content: center;
}
.pageNumbers {
    display: flex;
}
.pageButton {
    transition: all 0.3s;
    text-decoration: none;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #333;
    background-color: #fff;
    margin: 0 2px;
}
.pageButton:hover {
    opacity: 0.8;
    color: #555;
}
.pageButton.active {
    background-color: #3EBEEE;
    color: #fff;
}
</style>
