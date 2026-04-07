type UploadPayload = {
  userName: string;
  password: string;
};

export const Auth = async ({ userName, password }: UploadPayload) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/api/v1/auth`, {
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
