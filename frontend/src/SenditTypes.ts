export type ProfileType = {
	imgUri: string;
	name: string;
	skillLevel: string;
	id: number;
};

export type BoulderType = {
	id: number;
	imgUri: string;
	zone: number;
	color: string;
	score: number;
	grade: number;
	note: string;
};

export type RegistrationType = {
	imgUri: string;
	name: string;
	skillLevel: string;
	id: number;
	boulderId: number;
	boulderImgUri: string;
	zone: number;
	color: string;
	score: number;
	grade: number;
	note: string;
};

export const Color = {
	red: "#D05353",
	blue: "#5465FF",
	yellow: "#F9A620",
	green: "#548C2F",
	pink: "#EA526F",
	black: "#FFF",
};
