export type ICreateUsersBody = {
	email: string;
	name: string;
	skill_level: number;
};

export type IUpdateUsersBody = {
	name: string;
	id: number;
	skillLevel: number;
};

export type ICreateBoulderBody = {
	zone: number;
	color: string;
	score: number;
	grade: number;
	note: string;
};

export type IUpdateBoulderBody = {
	id: number;
	zone: number;
	color: string;
	score: number;
	grade: number;
	note: string;
};

export type ICreateAttemptBody = {
	climberId: number;
	boulderId: number;
	successful: boolean;
};

export type IUpdateAttemptBody = {
	climberId: number;
	boulderId: number;
	successful: boolean;
};

export type RegistrationBody = {
	climberId: number;
	boulderId: number;
};

export type ResultBody = {
	id: number,
	name: string,
	uri: string,
	score: number,
};
