import { Boulder } from "./db/entities/Boulder";

export type ICreateUsersBody = {
	name: string;
	email: string;
	password: string;
	skill_level: number;
};

export type IUpdateUsersBody = {
	name: string;
	id: number;
	skill_level: number;
};

export type ICreateBoulderBody = {
	zone: 1;
	color: "red";
	score: 1000;
	grade: 6;
	note: "This is a note for boulder 1";
};

export type IUpdateBoulderBody = {
	id: number;
	score: 1000;
	grade: 6;
	note: "This is a note for boulder 1";
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
