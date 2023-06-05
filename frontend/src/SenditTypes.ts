export type State = {
	currentProfile: ProfileType;
	likeHistory: Array<ProfileType>;
	passHistory: Array<ProfileType>;
};

export type ProfileType = {
	imgUri: string;
	thumbUri: string;
	name: string;
	petType: string;
	id: number;
};

export type BoulderType = {
	id: number;
	imgUri: string;
	zone: number,
	color: string,
	score: number,
	grade: number,
	note: string
}
