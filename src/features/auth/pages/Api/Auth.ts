type UploadPayload = {
  userName: string;
  password: string;
};

export const Auth = async ({ userName, password }: UploadPayload) => {
  const response = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName,
      password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Authentication failed");
  }
  

  return response.json();
};