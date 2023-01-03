export interface ApiResponseType {
	relatedimages: string[];
	baseimages: string[];
	name: string;
	cat: string;
}

export interface User {
	cat: string;
	email: string;
	name: string;
	won: number;
	lost: number;
}
