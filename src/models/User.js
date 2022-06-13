export default class User {
	id = "";
	nickname = "";
	profilesrc = "";

	constructor({ id_user, nickname, photo_link }) {
		this.id = id_user; //TODO OS ENVOLVIDOS QUE ENTREM EM ACORDO DESSE TBM (id_user ou id)
		this.nickname = nickname;
		this.profilesrc = photo_link;
	}
}
