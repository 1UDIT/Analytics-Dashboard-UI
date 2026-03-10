import { useState } from "react";

type FileItem = {
  username: string;
  filename: string;
};

type Props = {
  data: FileItem[];
  onDelete?: (file: FileItem) => void;
};

export default function FolderTree({ data, onDelete }: Props) {
  const [openFolder, setOpenFolder] = useState<string | null>(null);

  console.log(data, "data")


  // group files by username
  const grouped = data?.reduce<Record<string, string[]>>((acc, item) => {
    if (!acc[item.username]) {
      acc[item.username] = [];
    }
    acc[item.username].push(item.filename);
    return acc;
  }, {});

  const toggle = (user: string) => {
    setOpenFolder(openFolder === user ? null : user);
  };

  return (
    <div className="w-full h-full max-w-md bg-white shadow rounded-lg p-4 overflow-auto select-none">
      {Object.entries(grouped).map(([user, files]) => (
        <div key={user} className="mb-2">
          {/* Folder */}
          <div
            onClick={() => toggle(user)}
            className="cursor-pointer font-semibold flex items-center gap-2"
          >
            📁 {user}
          </div>

          {/* Files */}
          {openFolder === user && (
            <div className="ml-6 mt-1">
              {files.map((file, i) => (
                <div
                  key={i}
                  className="group flex items-center justify-between px-2 py-1 rounded hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2 text-gray-700">
                    📄 {file}
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() =>
                      onDelete?.({ username: user, filename: file })
                    }
                    className="opacity-0 group-hover:opacity-100 text-red-500 text-sm cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}