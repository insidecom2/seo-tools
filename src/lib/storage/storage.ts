const jwt = require("jsonwebtoken");

export const sendFileToStore = (
  file: File,
  token: string,
  bucket: string,
  url: string
) => {
  if (!file) return null;

  return uploadFile(bucket, token, file, url);
};

export const generateToken = (bucket: string, storeKey: string) => {
  const token = jwt.sign({ bucket }, storeKey, {
    expiresIn: "5m",
    algorithm: "HS256",
  });
  return token;
};

const uploadFile = async (
  bucket: string,
  token: string,
  file: File,
  url: string
) => {
  const formData = new FormData();
  formData.append("file", file);

  const headers = {
    bucket: bucket,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${url}/api/upload`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: headers,
    body: formData, // body data type must match "Content-Type" header
  });

  return {
    status: response.status,
    response: (await response.json()) ?? {},
  }; // parses JSON response into native JavaScript objects
};

export const deleteFile = async (
  bucket: string,
  filename: string,
  token: string,
  url: string
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    bucket: bucket,
    "Content-Type": "application/json",
  };

  const response = await fetch(`${url}/api/upload/delete`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: headers,
    body: JSON.stringify({
      url: filename.replace(
        process.env.NEXT_PUBLIC_STORAGE_BUCKET_URL + "/",
        ""
      ),
    }),
  });

  return {
    status: response.status,
    response: (await response.json()) ?? {},
  }; // parses JSON response into native JavaScript objects
};
