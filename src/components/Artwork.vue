<template>
    <v-img :src="item.url" max-width="1280" max-height="720"/>
</template>

<script>
import {Categories} from "../data/categories";

export default {
    name: "Artwork",
    props: {
        item: Object
    },
    computed: {
        isArtwork() {
            return this.item.type === Categories.ARTWORK
        }
    }
}
</script>

<style scoped>

</style>
