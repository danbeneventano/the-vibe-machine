<template>
    <!--<vue-friendly-iframe :src="url" frameborder="0" id="player"
                         allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                         allowfullscreen="true" v-show="!$root.loading" @document-load="$root.loading = false" />-->
    <!--<vytia-player v-if="isYouTube" :playerVars="playerVars" height="720" width="1280" ref="yt" @ready="onPlayerReady"/>-->
    <youtube :video-id="id" :player-vars="playerVars" ref="youtube" width="1280" height="720" :key="key"/>
</template>

<script>
import {Categories} from "./../data/categories";

export default {
    name: "YouTubeContainer",
    props: {
        item: Object
    },
    data() {
        return {
            playerVars: {
                autoplay: 1,        // Auto-play the video on load
                enablejsapi: 1
            },
            categories: Categories,
            key: 0
        }
    },
    methods: {
        onPlayerReady() {
            console.log("READY")
            this.$refs.yt.loadById(this.id)
            this.$refs.yt.player.playVideo()
        }
    },
    computed: {
        url() {
            if (this.item.url.includes("playlist?list=")) {
                const id = this.item.url.split("playlist?list=")[1]
                return `https://www.youtube.com/embed/videoseries?list=${id}&autoplay=1&loop=1`
            }
            const id = this.item.url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
            return `https://www.youtube.com/embed/${id}?autoplay=1`
        },
        id() {
            if (!this.isYouTube) {
                return "AOjJ4w9USDE"
            }
            if (this.item.url.includes("playlist?list=")) {
                return this.item.url.split("playlist?list=")[1]
                //return `https://www.youtube.com/embed/videoseries?list=${id}&autoplay=1&loop=1`
            }
            return this.item.url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
            //return `https://www.youtube.com/embed/${id}?autoplay=1`
        },
        isYouTube() {
            return this.item.type === Categories.MUSIC_VIDEO || this.item.type === Categories.VIDEOS_MISC
        }
    },
    watch: {
        id: function(val) {
            if (this.$refs.yt)
            this.$refs.yt.loadById(val)
        },
        isYoutube: function (newVal) {
            console.log("t")
            if (newVal) {
                console.log("t")
                this.key++
            }
        }
    }
}
</script>

<style scoped>
    .vue-friendly-iframe >>> iframe {
        width : 1280px;
        height: 720px;
    }
</style>
