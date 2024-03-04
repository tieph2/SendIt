export type ICreateUsersBody = {
	email: string;
	name: string;
	skill_level: number;
};

export type IUpdateUsersBody = {
	name: string;
	id: number;
	skill_level: number;
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
	climber_id: number;
	boulder_id: number;
	successful: boolean;
};

export type IUpdateAttemptBody = {
	climber_id: number;
	boulder_id: number;
	successful: boolean;
};

export type RegistrationBody = {
	climber_id: number;
	boulder_id: number;
};

export type ResultBody = {
	id: number,
	name: string,
	uri: string,
	score: number,
};
