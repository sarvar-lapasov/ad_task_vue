<template>
    <div class="container mx-auto py-5">
        <div class="my-5">
            <router-link to="/" class="p-2 px-10 rounded-md text-white bg-blue-300">
                Home
            </router-link>
            <div class="w-full grid grid-cols-1 md:grid-cols-3 md:gap-3 mt-5">
                <div class="flex flex-col col-span-2 rounded-lg  bg-white p-5">
                    <div>
                        <div v-if="getAd && getAd.all_photos && getAd.all_photos.length > 0"
                             class="carousel h-96 w-full">
                            <div
                                v-for="(photo, index) in getAd.all_photos"
                                :key="index"
                                :class="{ 'carousel-item': true, 'relative': true, 'w-1/2 transform translate-x-1/2': true, 'hidden': !isImgVisible(index) }"
                            >
                                <img :src="url + photo.path" class="object-contain h-96 w-full rounded-lg"/>
                                <div
                                    class="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 top-1/2">
                                    <button @click="prev()"
                                            class="btn bg-white p-2 px-4 rounded-full border border-black">❮
                                    </button>
                                    <button @click="next()"
                                            class="btn bg-white p-2 px-4 rounded-full border border-black">❯
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div v-else class="w-1/2 transform translate-x-1/2">
                            <ImgRow class="object-cover h-96 w-96 rounded-xl" :Item="getAd"/>
                        </div>
                    </div>

                    <div class="py-3 flex flex-col mt-5 border-t-2 border-black">
                        <h4 class="text-xl font-bold">Description</h4>
                        <p>{{ getAd.description }}</p>
                    </div>
                </div>
                <div class="flex flex-col h-full md:h-2/3  justify-between  rounded-lg mt-5 md:mt-0 bg-white p-5">
                    <div>
                        <p class="border-b-2 border-black pb-3">
                            {{ dayjs(getAd.created_at).tz('Asia/Tashkent').format('DD-MM-YYYY HH:mm:ss')}}
                        </p>
                        <div class="flex flex-col w-full mt-5 mb-3">
                            <h5 class="capitalize text-3xl font-semi-bold">
                                {{ getAd.name }}
                            </h5>
                            <h3 class="text-4xl mt-5 font-extrabold">
                                ${{ getAd.price }}
                            </h3>
                        </div>
                    </div>

                    <div class="w-full flex flex-col gap-2">
                        <button type="button" class="p-2  rounded-md text-white bg-blue-300">
                            Message
                        </button>
                        <button type="button" class="p-2  rounded-md text-white bg-blue-300">
                            Phone
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ImgRow from "@/components/ImgRow.vue";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc);
dayjs.extend(timezone);


export default {
    name: "BookInfoPage",
    components: {
        ImgRow,
    },
    data() {
        return {
            url: import.meta.env.VITE_APP_API_URL,
            activeIndex: 0,
            dayjs,
        };
    },
    computed: {
        ...mapGetters(["getAd"]),
    },
    methods: {
        ...mapActions(["fetchAd"]),
        prev() {
            if (this.activeIndex > 0) {
                this.activeIndex--;
            }
        },
        next() {
            if (this.activeIndex < this.getAd.all_photos.length - 1) {
                this.activeIndex++;
            }
        },
        isImgVisible(index) {
            return index === this.activeIndex;
        },
    },
    watch: {
        getAd() {
            this.activeIndex = 0;
        },
    },
    mounted() {
        this.fetchAd(this.$route.params.adId);
    },
};
</script>

<style scoped>
</style>