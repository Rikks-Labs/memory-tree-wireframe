'use server';

import { RegisterFormData, UserFileMetaData, UserId, cookieResponse } from "#/types/objects";
import { registerUser } from "#/utils/register";
import { verify } from 'jsonwebtoken';
import { cookies } from "next/headers";
import { baseUrl } from "#/constants/constants";
import sql from "#/lib/db";
import { stat } from "fs";



export async function handleRegister(formData: FormData) {
	const userFormData: RegisterFormData = {
		username: formData.get('username')?.toString() || '',
		email: formData.get('email')?.toString() || '',
		password: formData.get('password')?.toString() || '',
	};

	await registerUser(userFormData)
}


export async function getUserIdFromCookie() {

	const cookieStore = cookies();
	const sessionCookie = (await cookieStore).get('sessioncookie');

	// return an error message the app can display in a dedicated UI 
	if (!sessionCookie) {
		const response: cookieResponse<null> = {
			success: false,
			error: {
				status: 404,
				message: 'You need to login for that'
			}
		}
		return response
	}


	const decoded = verify(sessionCookie.value, 'vws7XKWHH4Dx11IfmDh836vl2cXop6ISfvilSv9q4DGF8ayYK+aLMT6eD5rkyFfrfo0OtAHjTXh2TYnCLsc9JA');
	const data = (decoded as UserId).userId;

	const response: cookieResponse<number> = {
		success: true,
		data,
	}
	return response
}


export async function handleFileUpload(file: File) {
	const formData = new FormData();

	const cookiResponse = await getUserIdFromCookie()

	const userId = cookiResponse.data

	try {

		try {

			if (cookiResponse.error) {
				console.log('no user id found!')
				return {
					status: 401,
					success: cookiResponse.success,
					message: cookiResponse.error.message
				}
			}

		} catch (error) {

			console.error('could not get user id: ', error);
			return {
				status: 500,
				success: false,
				message: `We have encountered an error. Please Login if you haven't`
			};

		}

		formData.append('file', file);
		console.log(file.name);

		const apiResponse = await fetch(`${baseUrl}/api/uploadtob2`, {

			method: 'POST',
			body: formData,

		});

		if (!apiResponse.ok) {
			const errorText = await apiResponse.json()
			console.log(`error on your uploadb2 api route: ${errorText} `)
			return {
				success: false,
				message: `upload has failed nigger!, here might be why: ${errorText} `
			}
		}

		if (apiResponse.ok) {

			const result = await apiResponse.json()
			const fileId: string = result.fileId

			try {

				const userFileData: UserFileMetaData = {
					fileId: fileId.toString(),
					userId,
					name: file.name,
					size: file.size,
					type: file.type,
					uploadedAt: new Date(),
				};

				await sql`
					CREATE TABLE IF NOT EXISTS userfiledata (
						file_id VARCHAR PRIMARY KEY,
						user_id INTEGER NOT NULL,
						name VARCHAR UNIQUE NOT NULL,
						size BIGINT NOT NULL,
						type VARCHAR NOT NULL,
						uploadedat TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
						CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
					);
				`;

				await sql`INSERT INTO userfiledata (file_id, user_id, name, size, type, uploadedat) VALUES (
						${userFileData.fileId},
						${userFileData.userId},
						${userFileData.name},
						${userFileData.size},
						${userFileData.type},
						${userFileData.uploadedAt}
					)
				`;

			} catch (error) {

				console.log('error with db: ', error)
				return {
					success: false,
					message: 'file was uploaded but not saved, try again',
					status: 500
				}

			}

		}

		return {
			status: 200,
			success: true,
			message: 'file uploaded and saved successfully!'
		}

	} catch (error) {
		// Handle any errors that occur during the file upload
		console.error('Error uploading file:', error);
		return {
			success: false,
			message: 'An error occurred during file upload'
		};
	}

}
