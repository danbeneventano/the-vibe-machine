<template>
    <vue-friendly-iframe frameborder="0" :class="{ fullscreen: $root.fullscreen, notfullscreen: !$root.fullscreen }"
                         :src="item.url" v-show="!$root.loading && item.type === categories.WEBSITE" @document-load="$root.loading = false" ref="frame"/>
</template>

<script>
import {Categories} from "./../data/categories";

export default {
    name: "Website",
    props: {
        item: Object
    },
    data() {
        return {
            categories: Categories
        }
    },
    created() {
        window.addEventListener('fullscreenchange', (event) => {
            if (!document.fullscreenElement) this.$root.fullscreen = false
        })
        window.addEventListener('webkitfullscreenchange', (event) => {
            if (!document.fullscreenElement) this.$root.fullscreen = false
        })
        window.addEventListener('mozfullscreenchange', (event) => {
            if (!document.fullscreenElement) this.$root.fullscreen = false
        })
    },
    computed: {
        url() {
            if(this.item.type !== this.categories.WEBSITE) {
                return "https://google.com"
            } else {
                return this.item.url
            }
        },
        isWebsite() {
            return this.item.type === Categories.WEBSITE
        },
    },
    watch: {
        '$root.fullscreen': function(val) {
            if (val) {
                const elem = this.$refs.frame.$el
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.mozRequestFullScreen) { /* Firefox */
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { /* IE/Edge */
                    elem.msRequestFullscreen();
                }
            }
        }
    }
}
</script>

<style scoped>
    .fullscreen >>> iframe {
        position: fixed;
        top: 0px;
        bottom: 0px;
        right: 0px;
        width: 100%;
        border: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        z-index: 999999;
        height: 100%;
    }

    .notfullscreen >>> iframe {
        width: 1280px;
        height: 720px;
    }
</style>
