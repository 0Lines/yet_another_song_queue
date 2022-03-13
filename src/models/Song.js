export default class Song {
	title = "";
	ownerChannelName = "";
	thumbnails = [];

	constructor({ title, ownerChannelName, thumbnails }) {
		this.title = title;
		this.ownerChannelName = ownerChannelName;
		this.thumbnails = thumbnails;
	}
}