type UploadPayload = {
  userName: string;
  password: string;
};

export const Auth = async ({userName, password}: UploadPayload) => {
  const body= JSON.stringify({
    userName,
    password
  })
  const response = await fetch("http://localhost:8000/login", {
    method: "POST",
    body: body,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();  
};