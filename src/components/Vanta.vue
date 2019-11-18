<template>
    <v-container style="background-color: #0097a7" class="fill-height vanta-container" :id="vantaId" fluid>
        <slot/>
    </v-container>
</template>

<script>
import * as THREE from 'three'

export default {
    name: 'VueVanta',
    data() {
        return {
            vantaEffect: {},
            highlightColor: {
                r: 0,
                g: 0,
                b: 0
            },
            highlightColorCode: '#000000',
            midtoneColor: {
                r: 100,
                g: 100,
                b: 100
            },
            midtoneColorCode: '#000000'
        }
    },
    props: {
        effect: {
            type: String,
            default: () => 'birds'
        },
        options: {
            type: Object,
            default: () => ({
                highlightColor: '#a400ff',
                midtoneColor: '#ff1f00',
                lowlightColor: '#2d00ff',
                baseColor: '#ffebeb',
                blurFactor: 0.6,
                zoom: 1,
                speed: 1
            })
        },
        src: {
            type: String,
            default: () => 'https://cdn.jsdelivr.net/gh/tengbao/vanta@master/dist'
        },
        vantaId: {
            type: String,
            default: () => 'vanta-1'
        },
        enabled: {
            type: Boolean,
            default: () => true
        },
        threeVersion: {
            type: Number,
            default: () => 101
        }
    },
    beforeMount() {
        if (this.enabled) {
            this.setup()
        }
    },
    mounted() {
        setInterval(() => {
            this.bg();
        }, 10);
    },
    methods: {
        RGB2HTML(red, green, blue) {
            var decColor = 0x1000000 + blue + 0x100 * green + 0x10000 * red;
            return '#' + decColor.toString(16).substr(1);
        },

        bg() {
            let {r, g, b} = this.highlightColor

            if (r < 255 && g == 0 && b == 0) {
                this.highlightColor.r++;
            }

            if (r == 255 && b == 0 && g < 255) {
                this.highlightColor.g++;
            }

            if (r == 255 && g == 255 && b < 255) {
                this.highlightColor.b++;
            }

            if (b == 255 && g == 255 && r > 0) {
                this.highlightColor.r--;
            }

            if (r == 0 && b == 255 && g > 0) {
                this.highlightColor.g--;
            }

            if (r == 0 && g == 0 && b > 0) {
                this.highlightColor.b--;
            }

            this.highlightColorCode = this.RGB2HTML(r, g, b)

            this.vantaEffect.setOptions({
                highlightColor: this.highlightColorCode
            })
        },

        setup() {
            this.$nextTick(() => {
                this.vantaEffect = window.VANTA[this.effect.toUpperCase()](
                    Object.assign(this.options, {
                        el: `#${this.vantaId}`,
                        THREE: THREE
                    })
                )
            })
        },

        disable() {
            this.vantaEffect.destroy()
        }
    },
    watch: {
        enabled: function(val) {
            if (!val) {
                this.disable()
            } else {
                this.setup()
            }
        }
    }
}
</script>

<style scoped>
    .vanta-container {
        height: 100%;
    }
</style>
