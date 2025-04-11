import { UserFileMetaData } from "#/Types/objects";
import { appKeyB2, appKeytIdB2, baseUrlB2, bucketIdB2 } from "#/constants/constants";
import sql from "#/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.formData();
        const file = data.get("file") as File;

        if (!file) {
            console.error("No file found in the request.");
            return NextResponse.json(
                { success: false, message: "No file uploaded." },
                { status: 400 }
            );
        }

        console.log(`Uploading file: ${file.name}`);

        const b2Response = await uploadFileToB2(file);
        const fileId: string = await b2Response.result.fileId.toString()

        return NextResponse.json(
            { success: b2Response.success, message: b2Response.message, result: b2Response.result, fileId: fileId || null },
            { status: b2Response.status }
        );
    } catch (error) {
        console.error("Error during file upload:", error);
        return NextResponse.json(
            { success: false, message: `Error: ${error}` },
            { status: 500 }
        );
    }
}

async function uploadFileToB2(file: File) {
    try {
        const { authToken, apiUrl } = await getB2AuthToken();
        if (!authToken) {
            throw new Error("Authorization token or missing.");
        }
        if (!apiUrl) {
            throw new Error('missing API URL');
        }

        const { uploadUrl, uploadAuthToken } = await getUploadUrl(authToken, apiUrl);
        if (!uploadUrl || !uploadAuthToken) throw new Error("Upload URL or authorization token missing.");

        const response = await fetch(uploadUrl, {
            method: "POST",
            headers: {
                Authorization: uploadAuthToken,
                "X-Bz-File-Name": encodeURIComponent(file.name),
                "Content-Type": "b2/x-auto",
                "Content-Length": file.size.toString(),
                "X-Bz-Content-Sha1": "do_not_verify",
                "X-Bz-Server-Side-Encryption": "AES256",
            },
            body: file,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`File upload failed: ${errorText}`);
        }

        const result = await response.json();
        console.log("File uploaded successfully:", result);
        return { status: 200, success: true, message: "File uploaded successfully.", result };
    } catch (error) {
        console.error("Upload error:", error);
        return { status: 500, success: false, message: error };
    }
}

async function getUploadUrl(authToken: string, apiUrl: string) {
    const response = await fetch(`${apiUrl}/b2api/v3/b2_get_upload_url?bucketId=${encodeURIComponent(bucketIdB2)}`, {
        method: "GET",
        headers: { Authorization: authToken },
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to fetch upload URL:", errorText);
        throw new Error("Failed to fetch upload URL.");
    }

    const data = await response.json();
    return {
        uploadUrl: data.uploadUrl,
        uploadAuthToken: data.authorizationToken
    };
}

async function getB2AuthToken() {
    const bearerToken = "Basic " + btoa(`${appKeytIdB2}:${appKeyB2}`);
    const response = await fetch(`${baseUrlB2}/b2api/v3/b2_authorize_account`, {
        method: "GET",
        headers: { Authorization: bearerToken },
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Authorization error:", errorText);
        // throw new Error("Failed to authorize with Backblaze B2.");
    }

    const data = await response.json();
    console.log(data)
    return {
        authToken: data.authorizationToken,
        apiUrl: data.apiInfo.storageApi.apiUrl
    };
}