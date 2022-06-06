export default class User {
	id = "";
	firstname = "";
	lastname = "";
	profilesrc = "";

	constructor({ id_user, nickname, photo_link }) {
		this.id = id_user; //TODO OS ENVOLVIDOS QUE ENTREM EM ACORDO DESSE TBM (id_user ou id)
		this.firstname = nickname;
		//this.lastname = params.lastname; OS ENVOLVIDOS QUE ENTREM EM ACORDO
		this.profilesrc = photo_link;
	}
}
