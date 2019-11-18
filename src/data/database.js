import {websites} from "./websites";
//import {artwork} from "./artwork";
import {music_songs} from "./music_songs";
import {music_albums} from "./music_albums";
import {music_videos} from "./music_videos";
import {videos_misc} from "./videos_misc";
import {Categories} from "./categories";

export const shuffle = (items) => {
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = items[i]
        items[i] = items[j]
        items[j] = temp
    }
    return items
}

String.prototype.hashCode = function(seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed
    for (let i = 0, ch; i < this.length; i++) {
        ch = this.charCodeAt(i)
        h1 = Math.imul(h1 ^ ch, 2654435761)
        h2 = Math.imul(h2 ^ ch, 1597334677)
    }
    h1 = Math.imul(h1 ^ h1>>>16, 2246822507) ^ Math.imul(h2 ^ h2>>>13, 3266489909)
    h2 = Math.imul(h2 ^ h2>>>16, 2246822507) ^ Math.imul(h1 ^ h1>>>13, 3266489909)
    return 4294967296 * (2097151 & h2) + (h1>>>0)
}

const shuffledItems = shuffle(
    websites.map(url => {
        return {type: Categories.WEBSITE, url: url }
    })/*.concat(artwork.map(url => {
        return {type: Categories.ARTWORK, url: url }
    }))*/.concat(music_songs.map(url => {
        return {type: Categories.MUSIC_SONG, url: url }
    })).concat(music_albums.map(url => {
        return {type: Categories.MUSIC_ALBUM, url: url }
    })).concat(music_videos.map(url => {
        return {type: Categories.MUSIC_VIDEO, url: url }
    })).concat(videos_misc.map(url => {
        return {type: Categories.VIDEOS_MISC, url: url }
    }))
)

const itemMap = new Map()
shuffledItems.forEach(el => itemMap.set(el.url.hashCode(), el))

export default itemMap
