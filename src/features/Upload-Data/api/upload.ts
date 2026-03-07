type UploadPayload = {
  file: File;
  userName: string;
};

export const uploadFile = async ({file, userName}: UploadPayload) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("username", userName);

  const response = await fetch("http://localhost:8000/analytics/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();  
};