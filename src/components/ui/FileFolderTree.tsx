import { useState } from "react";
import { FaTrash, FaFolderOpen } from "react-icons/fa";

type FileItem = {
  username: string;
  filename: string;
  id: number
};

type Props = {
  data: FileItem[];
  onDelete?: (file: FileItem) => void;
  onOpen?: (file: FileItem) => void;
};

export default function FolderTree({ data, onDelete, onOpen }: Props) {
  const [openFolder, setOpenFolder] = useState<string | null>(null);



  const grouped = data?.reduce<Record<string, FileItem[]>>((acc, item) => {
    if (!acc[item.username]) {
      acc[item.username] = [];
    }
    acc[item.username].push(item);
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
              {files.map((file) => (
                <div
                  key={file.id}
                  className="group flex items-center justify-between px-2 py-1 rounded hover:bg-gray-100"
                >
                  {/* File name */}
                  <div className="flex items-center gap-2 text-gray-700">
                    📄 {file.filename}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => onOpen?.(file)}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                      title="Open file"
                    >
                      <FaFolderOpen />
                    </button>

                    <button
                      onClick={() => onDelete?.(file)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}