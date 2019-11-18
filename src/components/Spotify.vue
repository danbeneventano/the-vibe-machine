<template>
    <vue-friendly-iframe :src="url" frameborder="0" allowtransparency="true"
                         allow="encrypted-media" v-show="!$root.loading" @document-load="$root.loading = false"/>
</template>

<script lang="ts">
import {Categories} from "../data/categories";

export default {
    name: "Spotify",
    props: {
        item: Object
    },
    computed: {
        url() {
            if (this.item.url.includes("album")) {
                const id = this.item.url.split("album/")[1].split("?si")[0]
                return `https://open.spotify.com/embed/album/${id}`
            }
            const id = this.item.url.split("track/")[1].split("?si")[0]
            return `https://open.spotify.com/embed/track/${id}`
        },
        isSpotify() {
            return this.item.type === Categories.MUSIC_SONG || this.item.type === Categories.MUSIC_ALBUM
        }
    }
}
</script>

<style scoped>
    .vue-friendly-iframe >>> iframe {
        width : 500px;
        height: 500px;
    }
</style>
