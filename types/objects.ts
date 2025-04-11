

export type RegisterFormData = {
	username: string;
	email: string;
	password: string;
}

export type LoginFormData = {
	email: string;
	password: string;
}

export interface UserId {
	userId: number;
}


export interface cookieResponse<T> {
	success: boolean;
	error?: {
		status: number;
		message: string
	};
	data?: T
}

export interface UserFileMetaData {
	fileId: string;
	userId: number | null | undefined;
	name: FileMetaData['name'];
	size: FileMetaData['size'];
	type: FileMetaData['type'];
	uploadedAt: Date;
}

export interface UserFileTable{
	name:UserFileMetaData['name'];
	type:UserFileMetaData['type'];
	date:UserFileMetaData['uploadedAt'];
}

export interface UserFileTableProps{
	files: UserFileMetaData[];
}

export type FileUrl = {
	url: string;
}

export interface FileMetaData {
	file: File;
	name: string;
	size: number;
	type: string;
	lastModified: number;
}