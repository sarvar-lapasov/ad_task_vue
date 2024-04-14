<template>
    <div class="py-5 flex justify-between container mx-auto">
        <button @click="onToggle()" type="button" class="p-2 px-10 rounded-md text-white bg-blue-300">
            Create New Ad
        </button>
        <select v-model="sortOption" @change="sortAds" class="rounded-md border-0 text-dark py-2 px-3">
            <option value="">Sort By</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="creation_date-asc">Date (Old to New)</option>
            <option value="creation_date-desc">Date (New to Old)</option>
        </select>
    </div>
    <transition name="fade">
        <div v-if="isModalVisible">
            <div
                @click="onToggle()"
                class="absolute bg-black opacity-50 inset-0 z-10"
            ></div>
            <div
                class="w-full text-white max-w-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5  rounded-xl  z-20  bg-[#374050]"
            >
                <div class="flex justify-between mb-6">
                    <h5 class="text-2xl">Create new ad</h5>
                    <button type="button" class="focus:text-white" @click="onToggle()">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-7 h-7 text-[#c2c2c2]">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <div class="mt-6 grid grid-cols-4">
                    <form @submit.prevent="createAd" class="col-span-3">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="block text-sm mb-2">Name</label>
                            <input type="text"
                                   class="w-full rounded-md py-2 px-2.5 border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:none"
                                   id="exampleFormControlInput1" required
                                   v-model="ad.name">
                            <div v-if="validationErrors.name" class="text-red-500">{{ validationErrors.name }}</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput2" class="block text-sm mb-2">Description</label>
                            <input type="text"
                                   class="w-full rounded-md py-2 px-2.5 border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:none"
                                   id="exampleFormControlInput2" required
                                   v-model="ad.description">
                            <div v-if="validationErrors.description" class="text-red-500">
                                {{ validationErrors.description }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput3" class="block text-sm mb-2">Price</label>
                            <input type="number"
                                   class="w-full rounded-md py-2 px-2.5 border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:none"
                                   id="exampleFormControlInput3" required
                                   v-model="ad.price">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput4" class="block text-sm mb-2">Photos</label>
                            <input type="file" multiple accept="image/*" class="py-2" id="exampleFormControlInput4"
                                   ref="file" @change="handlePhotosChange"/>
                            <div v-if="validationErrors.photos" class="text-red-500">{{ validationErrors.photos }}</div>
                        </div>
                        <button type="submit" class="mt-7 p-2 px-10 rounded-md text-white bg-[#0FC5FF]">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import {mapActions} from "vuex";

export default {
    name: "HeaderRow",
    data() {
        return {
            validationErrors: {
                name: '',
                description: '',
                photos: ''
            },
            modal: false,
            ad: {
                name: '',
                description: '',
                price: ''
            },
            formData: {
                photos: [],
            },
            sortOption: ''
        }
    },
    computed: {
        isModalVisible() {
            return this.modal;
        },
    },
    methods: {
        ...mapActions(['fetchAds', 'pushAd', 'pushAdPhoto']),
        onToggle() {
            this.modal = !this.modal;
        },

        sortAds() {
            const [sortBy, order] = this.sortOption.split('-');
            this.fetchAds({sortBy, order});

        },
        createAd() {
            this.validationErrors = {
                name: '',
                description: '',
                photos: ''
            };

            if (this.ad.name.length > 200) {
                this.validationErrors.name = 'Name should not exceed 200 characters.';
                return;
            }

            if (this.ad.description.length > 1000) {
                this.validationErrors.description = 'Description should not exceed 1000 characters.';
                return;
            }

            if (this.formData.photos.length > 3) {
                this.validationErrors.photos = 'You can only upload up to 3 photos.';
                return;
            }
            this.pushAd(this.ad)
                .then((response) => {
                    console.log(response.data.id);
                    const id = response.data.id;
                    this.pushAdPhoto({id, data: this.formData})
                        .then((response) => {
                            console.log(response);
                            this.resetForm()
                        })
                })
        },
        resetForm() {
            this.ad = {
                name: '',
                description: '',
                price: ''
            };
            this.formData = {
                photos: []
            };
            this.$refs.file.value = null;
        },
        handlePhotosChange() {
            let file = this.$refs.file.files;

            for (let i = 0; i < file.length; i++) {
                this.formData.photos.push(file[i]);
            }
        }
    }
}
</script>
<style scoped>.fade-enter,
.fade-leave-to {

    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {

    transition: opacity .5s ease-out;
}</style>
