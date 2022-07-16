import Song from "@/models/Song.js";

export default class MirroredJukebox {
    playingSong = new Song({});
	isPlaying = false;
	startedAt = 0;
	stoppedAt = 0;

    constructor() {
        this.resetJukebox();
    }

	resetJukebox() {
		this.playingSong = new Song({}),
		this.isPlaying = false;
		this.startedAt = 0;
		this.stoppedAt = 0;
	}

	play(songElapsedTime) {
		this.isPlaying = true;
		this.startedAt = Date.now() - songElapsedTime;
	}

	pause(songElapsedTime) {
		this.isPlaying = false;
		this.stoppedAt = this.startedAt + songElapsedTime;
	}

	changeSong(newSong) {
		this.resetJukebox();
		this.playingSong = newSong;
		this.play(0);
	}
}