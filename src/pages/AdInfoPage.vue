<template>
    <div class="container mx-auto py-5">
      <div class="my-5">
         <router-link to="/" class="p-2 px-10 rounded-md text-white bg-blue-300">
                Home
            </router-link>
        <div class="w-full flex rounded-lg cursor bg-white mt-5 p-3">
          <div class=" p-2 flex w-full">
            <div>
              <div v-if="getAd && getAd.all_photos && getAd.all_photos.length > 0" class="carousel h-48 w-96">
                <div
                  v-for="(photo, index) in getAd.all_photos"
                  :key="index"
                  :class="{ 'carousel-item': true, 'relative': true, 'w-full': true, 'hidden': !isImgVisible(index) }"
                >
                  <img :src="url + photo.path" class="object-cover h-48 w-96 rounded-lg" />
                  <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <button @click="prev()" class="btn bg-white p-2 px-4 rounded-full">❮</button>
                    <button @click="next()" class="btn bg-white p-2 px-4 rounded-full">❯</button>
                  </div>
                </div>
              </div>
              <div v-else>
                <ImgRow class="object-cover h-48 w-96 rounded-xl" :Item="getAd" />
              </div>
            </div>
            <div class="mx-5 py-3 w-full flex flex-col">
                <div class="flex w-full justify-between  mb-3">
                        <h5 class="capitalize">
                            {{ getAd.name }}
                        </h5>
                          <p class="">
                            ${{ getAd.price }}
                        </p>
                      </div>
                <p>{{ getAd.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from "vuex";
  import ImgRow from "@/components/ImgRow.vue";

  
  export default {
    name: "BookInfoPage",
    components: {
        ImgRow,
    },
    data() {
      return {
        url: import.meta.env.VITE_APP_API_URL,
        activeIndex: 0,
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