export default class User {
	id_user = "";
	nickname = "";
	profilesrc = "";

	constructor({ id_user, nickname, photo_link }) {
		this.id_user = id_user;
		this.nickname = nickname;
		this.profilesrc = photo_link;
	}
}
