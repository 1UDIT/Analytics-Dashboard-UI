type UploadPayload = {
  file: File;
  userName: string;
  role: string;
};

export const uploadFile = async ({file, userName, role}: UploadPayload) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("username", userName);
  formData.append("role", role);

  const response = await fetch(`${API_URL}/api/v1/analytics/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();  
};
