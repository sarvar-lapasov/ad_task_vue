<template>
    <div class="container w-full mx-auto xl:container">
        <div class="w-full">
            <div
                v-for="ad of getAds"
                v-bind:key="ad.id"
                class="w-full"
            >
                <router-link :to="'/ad-info/' + ad.id" class="w-full flex rounded-lg cursor  bg-white mt-3 p-5">
                    <ImgRow class="object-cover h-48 w-96 rounded-xl" :Item="ad" />

                    <div class="flex w-full flex-col justify-between px-5">
                      <div class="flex w-full justify-between  mb-3">
                        <h5 class="capitalize">
                            {{ ad.name }}
                        </h5>
                          <p class="">
                            ${{ ad.price }}
                        </p>
                      </div>
                       
                        <div class="flex justify-end">
                            <p class="">
                            {{ dayjs(ad.created_at).tz('Asia/Tashkent').format('DD-MM-YYYY') }}
                        </p>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <PaginationRow :All="getAdTotal" @pageClick="pageClick" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ad from "@/plugins/vuex/ad";
import ImgRow from "@/components/ImgRow.vue";
import PaginationRow from "./PaginationRow.vue";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc);
dayjs.extend(timezone);


export default {
    name: "BooksRow",
    components: {
        ImgRow,
        PaginationRow
    },
    data() {
        return {
            dayjs,
        };
    },
    computed: {
        ad() {
            return ad;
        },
        ...mapGetters(["getAds","getAdTotal"]),
    },
    methods: {
        ...mapActions(["fetchAds"]),
        pageClick(pageNum) {
            this.fetchAds({page: pageNum})
        },
    },
    mounted() {
      this.fetchAds()
    },
};
</script>

<style scoped>

</style>
