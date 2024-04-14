<template>
    <div class=" block py-5 mx-auto">
        <HeaderRow/>
            <AdList/>
    </div>  
</template>

<script>
import AdList from "@/components/AdList.vue";
import HeaderRow from "@/components/HeaderRow.vue";

export default {
    name: "HomePage",
    components: {
        HeaderRow,
        AdList,
    },
   
}
</script>
<style>

</style>