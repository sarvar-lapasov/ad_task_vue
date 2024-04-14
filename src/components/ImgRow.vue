<template>
    <img
        v-if="Item.main_photo"
        :src="url + Item.main_photo.path"
        class=""
        alt="Image"
    />
    <img
        v-else
        src="../assets/img/no_image.png"
        class="bg-gray-100"
        alt="Image"
    />
</template>
<script>
export default {
    name: "ImgRow",
    data() {
        return {
            url: import.meta.env.VITE_APP_API_URL
        }
    },
    props: {
        Item: {
            type: Object,
            required: true,
        },
    },
};
</script>
<style scoped></style>
