<template>
    <v-img :src="url" v-if="isArtwork" />
    <vue-friendly-iframe :style="style" id="player" frameborder="0" :class="clazz" :src="url" ref="frame" v-else />

    <!--<div>
        <div style="width: 1280px; height: 720px" id="player" v-if="isYouTube" />
        <Artwork :item="item" v-if="isArtwork" />
        <Spotify :item="item" v-if="isSpotify" />
        <Website :item="item" v-if="isWebsite" />
    </div>-->

</template>

<script>
import {Categories} from "../data/categories";
import YouTubePlayer from 'youtube-player';
import Spotify from "./Spotify";
import Website from "./Website";
import Artwork from "./Artwork";

export default {
    name: "FrameHolder",
    components: {Artwork, Website, Spotify},
    props: {
        item: Object
    },
    data() {
        return {
            player: null
        }
    },
    mounted() {
        if (this.isYouTube) {
            this.player = YouTubePlayer("player")
            this.player.setSize(1280, 720)
            this.player.loadVideoByUrl(this.youtubeUrl)
            this.player.on('stateChange', event => {
                if (event.data === 0) { // video ended
                    this.$root.next()
                }
            })
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
            if (this.isYouTube) {
                return "about:blank"
            } else if (this.isSpotify) {
                if (this.item.url.includes("album")) {
                    const id = this.item.url.split("album/")[1].split("?si")[0]
                    return `https://open.spotify.com/embed/album/${id}`
                }
                const id = this.item.url.split("track/")[1].split("?si")[0]
                return `https://open.spotify.com/embed/track/${id}`
            } else if (this.isWebsite || this.isArtwork) {
                return this.item.url
            }
        },
        youtubeUrl() {
            if (this.isYouTube) {
                if (this.item.url.includes("playlist?list=")) {
                    const id = this.item.url.split("playlist?list=")[1]
                    return `https://www.youtube.com/embed/videoseries?list=${id}&autoplay=1&loop=1`
                }
                const id = this.item.url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
                return `https://www.youtube.com/embed/${id}?autoplay=1`
            } else return ""
        },
        clazz() {
            return {
                fullscreen: this.$root.fullscreen,
                notfullscreen: !this.$root.fullscreen && !this.isSpotify,
                spotifyFrame: this.isSpotify,
                youtubeFrame: !this.isSpotify
            }
        },
        style() {
            return { width: this.width + 'px', height: this.height + 'px' }
        },
        width() {
            if (this.isSpotify) return "500"
            else return "1280"
        },
        height() {
            if (this.isSpotify) return "500"
            else return "720"
        },
        isYouTube() {
            return this.item.type === Categories.MUSIC_VIDEO || this.item.type === Categories.VIDEOS_MISC
        },
        isWebsite() {
            return this.item.type === Categories.WEBSITE
        },
        isArtwork() {
            return this.item.type === Categories.ARTWORK
        },
        isSpotify() {
            return this.item.type === Categories.MUSIC_SONG || this.item.type === Categories.MUSIC_ALBUM
        }
    },
    watch: {
        youtubeUrl: function(val) {
            if (this.isYouTube) {
                if (!this.player) {
                    this.player = YouTubePlayer("player")
                    this.player.setSize(1280, 720)
                    this.player.loadVideoByUrl(this.youtubeUrl)
                    this.player.on('stateChange', event => {
                        if (event.data === 0) { // video ended
                            this.$root.next()
                        }
                    })
                } else {
                    this.player.loadVideoByUrl(val)
                }
            } else {
                if (this.player) {
                    this.player.destroy()
                    this.player = null
                }
            }
        },
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
    .spotifyFrame >>> iframe {
        width: 500px;
        height: 500px;
    }

    .youtubeFrame >>> iframe {
        width: 1280px;
        height: 720px;
    }

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
