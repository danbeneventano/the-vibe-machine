<template>
    <v-app>
        <v-content>
            <vanta effect="fog" class="fill-height" :enabled="backgroundEnabled">
                <v-row align="center" justify="space-between" class="fill-height">
                    <v-btn icon x-large color="black" @click="$root.back" >
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <!--<v-col align="center" justify="center">
                        <YouTube :item="currentItem" v-if="isYouTube" key="video" />
                        <Website :item="currentItem" v-if="isWebsite" key="website" />
                        <Artwork :item="currentItem" v-if="isArtwork" key="artwork" />

&lt;!&ndash;
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLiN-7mukU_RGAt44N7jMkjdyXBu3sUy_d" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
&ndash;&gt;
                    </v-col>-->

                    <router-view style="width: 66.666%; height: 78.52%" />


                    <!--<keep-alive>
                        <router-view/>
                    </keep-alive>-->



                    <v-btn icon x-large color="black" @click="$root.next" >
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-row>

                <v-row align="center" justify="center" class="centered">
                    <v-checkbox class="pr-2" color="black" v-model="$root.selectedCategories" :value="categories.MUSIC_ALBUM" :label="categories.MUSIC_ALBUM"
                                :disabled="$root.selectedCategories.length === 1 && $root.selectedCategories[0] === categories.MUSIC_ALBUM"/>
                    <v-checkbox class="pr-2" color="black" v-model="$root.selectedCategories" :value="categories.MUSIC_SONG" :label="categories.MUSIC_SONG"
                                :disabled="$root.selectedCategories.length === 1 && $root.selectedCategories[0] === categories.MUSIC_SONG"/>
                    <v-checkbox class="pr-2" color="black" v-model="$root.selectedCategories" :value="categories.MUSIC_VIDEO" :label="categories.MUSIC_VIDEO"
                                :disabled="$root.selectedCategories.length === 1 && $root.selectedCategories[0] === categories.MUSIC_VIDEO"/>
                    <v-checkbox class="pr-2" color="black" v-model="$root.selectedCategories" :value="categories.VIDEOS_MISC" :label="categories.VIDEOS_MISC"
                                :disabled="$root.selectedCategories.length === 1 && $root.selectedCategories[0] === categories.VIDEOS_MISC"/>
                    <v-checkbox class="pr-2" color="black" v-model="$root.selectedCategories" :value="categories.WEBSITE" :label="categories.WEBSITE"
                                :disabled="$root.selectedCategories.length === 1 && $root.selectedCategories[0] === categories.WEBSITE"/>
                    <!--<v-checkbox class="pr-2" color="black" v-model="$root.selectedCategories" :value="categories.ARTWORK" :label="categories.ARTWORK"
                                :disabled="$root.selectedCategories.length === 1 && $root.selectedCategories[0] === categories.ARTWORK"/>-->
                </v-row>

                <v-btn outlined rounded fixed bottom left @click="$root.fullscreen = true" v-show="isWebsite">Enter Fullscreen</v-btn>

                <v-btn text fixed bottom right @click="backgroundEnabled = !backgroundEnabled">{{toggleButtonText}}</v-btn>
            </vanta>
        </v-content>
    </v-app>
</template>

<script>
import Vue from 'vue';
import Vanta from './components/Vanta.vue'
import {Categories} from "./data/categories";
import itemMap from "./data/database";

export default Vue.extend({
    name: 'App',
    components: {
        Vanta
    },
    data() {
        return {
            backgroundEnabled: true,
            categories: Categories,
        }
    },
    computed: {
        toggleButtonText() {
            if (this.backgroundEnabled) {
                return "Disable Background (May improve performance)"
            } else {
                return "Enable Background"
            }
        },
        isWebsite() {
            return itemMap.get(Number(this.$route.params.hash)).type === Categories.WEBSITE
        }
    },
    watch: {
        '$root.selectedCategories': function(val) {
            const query = { categories: val.join('+') }
            this.$router.push({ query })
        }
    }
});
</script>

<style>
    html {
        -ms-overflow-style: none; /* Internet Explorer 10+ */
        scrollbar-width: none; /* Firefox */
    }

    html::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
    }

    .v-input--selection-controls.v-input .v-label {
        color: black;
    }

    .centered {
        width: 75%;
        position: fixed;
        left: 50%;
        margin-left: -37.5%;
        bottom: 0;
    }
</style>
