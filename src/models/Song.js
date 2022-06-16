export default class Song {
    id_song = "";
    name = "";
    artist = "";
    music_link  = "";
    thumbnail_link = "";
    priority = 0;
    id_room = "";

    constructor(song) {
        this.id_song = song.id_song;
        this.name = song.name;
        this.artist = song.artist;
        this.music_link = song.music_link;
        this.thumbnail_link = song.thumbnail_link;
        this.priority = song.priority;
        this.id_room = song.id_room;
    }
}
