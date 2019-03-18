function filterArtist(artists) {
    let arr = []
    artists.forEach(item => {
        arr.push(item.name)
    })
    return arr.join('/')
}

export class Song {
    constructor({ id, name, artist, album, alias, coverImage, duration, url }) {
        this.id = id
        this.name = name
        this.artist = artist
        this.album = album
        this.alias = alias
        this.coverImage = coverImage
        this.duration = duration
        this.url = url
    }
}

export function createPlayList(music) {
    return new Song({
        id: music.id,
        name: music.name,
        artist: music.artists.length > 0 && filterArtist(music.artists),
        album: {
            name: music.album.name,
            status: music.album.status
        },
        alias: music.alias,
        coverImage: music.album.picUrl || null,
        duration: music.duration / 1000,
        url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
    })
}

// 歌曲数据格式化
export function formatSongs(list) {
    let Songs = []
    list.forEach(item => {
        const musicData = item
        if (musicData.id) {
            Songs.push(createPlayList(musicData))
        }
    })
    return Songs
}

export function createTopList(music) {
    return new Song({
        id: music.id,
        name: music.name,
        artist: music.ar.length > 0 && filterArtist(music.ar),
        album: {
            name: music.al.name,
            status: music.al.status
        },
        alias: music.alia,
        coverImage: music.al.picUrl,
        duration: music.dt / 1000,
        url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
    })
}

export function formatTopSongs(list) {
    let Songs = []
    list.forEach(item => {
        const musicData = item
        if (musicData.id) {
            Songs.push(createTopList(musicData))
        }
    })
    return Songs
}
