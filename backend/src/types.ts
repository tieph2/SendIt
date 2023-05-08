export type ICreateUserBody = {
	name: string;
	email: string;
	petType: string;
};

export type IcreateMessageBody = {
	sender: string;
	receiver: string;
	message: string;
};
