<template>
    <v-app>
        <v-content>
            <vanta effect="fog" class="fill-height" :enabled="backgroundEnabled">
                <v-row align="center" justify="space-between" class="fill-height">
                    <v-btn icon x-large color="black" @click="$root.back" >
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>

                    <router-view style="width: 66.666%; height: 78.52%" />

                    <v-btn icon x-large color="black" @click="$root.next" >
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>

                </v-row>

                <v-menu :close-on-content-click="false">
                    <template v-slot:activator="{ on }">
                        <v-btn fab fixed bottom right small v-on="on">
                            <v-icon>mdi-settings</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                                     @click="backgroundEnabled = !backgroundEnabled"
                        >
                            <v-list-item-action>
                                <v-switch color="black" v-model="backgroundEnabled" @click="backgroundEnabled = !backgroundEnabled" />
                            </v-list-item-action>
                            <v-list-item-title>
                                Background
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item :disabled="$root.selectedCategories.length === 1 && $root.selectedCategories[0] === categories.MUSIC_ALBUM"
                                @click="$root.selectedCategories.includes(categories.MUSIC_ALBUM)
                                ? $root.selectedCategories = $root.selectedCategories.filter(e => e !== categories.MUSIC_ALBUM)
                                : $root.selectedCategories.push(categories.MUSIC_ALBUM)"
                        >
                            <v-list-item-action>
                                <v-checkbox color="black" v-model="$root.selectedCategories" :value="categories.MUSIC_ALBUM"
                                            :disabled="$root.selectedCategories.length === 1 && $root.selectedCategories[0] === categories.MUSIC_ALBUM"/>
                            </v-list-item-action>
                            <v-list-item-title>
                                {{categories.MUSIC_ALBUM}}
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item :disabled="$root.selectedCategories.length === 1 && $root.selectedCategories[0] === categories.MUSIC_SONG"
                                @click="$root.selectedCategories.includes(categories.MUSIC_SONG)
                                ? $root.selectedCategories = $root.selectedCategories.filter(e => e !== categories.MUSIC_SONG)
                                : $root.selectedCategories.push(categories.MUSIC_SONG)"
                        >
                            <v-list-item-action>
                                <v-checkbox color="black" v-model="$root.selectedCategories" :value="categories.MUSIC_SONG"
                                            :disabled="$root.selectedCategories.length === 1 && $root.selectedCategories[0] === categories.MUSIC_SONG"/>
                            </v-list-item-action>
                            <v-list-item-title>
                                {{categories.MUSIC_SONG}}
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item :disabled="$root.selectedCategories.length === 1 && $root.selectedCategories[0] === categories.MUSIC_VIDEO"
                                @click="$root.selectedCategories.includes(categories.MUSIC_VIDEO)
                                ? $root.selectedCategories = $root.selectedCategories.filter(e => e !== categories.MUSIC_VIDEO)
                                : $root.selectedCategories.push(categories.MUSIC_VIDEO)"
                        >
                            <v-list-item-action>
                                <v-checkbox color="black" v-model="$root.selectedCategories" :value="categories.MUSIC_VIDEO"
                                            :disabled="$root.selectedCategories.length === 1 && $root.selectedCategories[0] === categories.MUSIC_VIDEO"/>
                            </v-list-item-action>
                            <v-list-item-title>
                                {{categories.MUSIC_VIDEO}}
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item :disabled="$root.selectedCategories.length === 1 && $root.selectedCategories[0] === categories.VIDEOS_MISC"
                                @click="$root.selectedCategories.includes(categories.VIDEOS_MISC)
                                ? $root.selectedCategories = $root.selectedCategories.filter(e => e !== categories.VIDEOS_MISC)
                                : $root.selectedCategories.push(categories.VIDEOS_MISC)"
                        >
                            <v-list-item-action>
                                <v-checkbox color="black" v-model="$root.selectedCategories" :value="categories.VIDEOS_MISC"
                                            :disabled="$root.selectedCategories.length === 1 && $root.selectedCategories[0] === categories.VIDEOS_MISC"/>
                            </v-list-item-action>
                            <v-list-item-title>
                                {{categories.VIDEOS_MISC}}
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item :disabled="$root.selectedCategories.length === 1 && $root.selectedCategories[0] === categories.WEBSITE"
                                @click="$root.selectedCategories.includes(categories.WEBSITE)
                                ? $root.selectedCategories = $root.selectedCategories.filter(e => e !== categories.WEBSITE)
                                : $root.selectedCategories.push(categories.WEBSITE)"
                        >
                            <v-list-item-action>
                                <v-checkbox color="black" v-model="$root.selectedCategories" :value="categories.WEBSITE"
                                            :disabled="$root.selectedCategories.length === 1 && $root.selectedCategories[0] === categories.WEBSITE"/>
                            </v-list-item-action>
                            <v-list-item-title>
                                {{categories.WEBSITE}}
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <!--<v-row align="center" justify="center" class="centered">
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
                    &lt;!&ndash;<v-checkbox class="pr-2" color="black" v-model="$root.selectedCategories" :value="categories.ARTWORK" :label="categories.ARTWORK"
                                :disabled="$root.selectedCategories.length === 1 && $root.selectedCategories[0] === categories.ARTWORK"/>&ndash;&gt;
                </v-row>-->

                <v-btn outlined rounded fixed bottom left @click="$root.fullscreen = true" v-show="isWebsite">Enter Fullscreen</v-btn>

                <!--<v-btn text fixed bottom right @click="backgroundEnabled = !backgroundEnabled">{{toggleButtonText}}</v-btn>-->
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
