import React from 'react';

const FileUpload = ({ files, setFiles }) => {
  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const handleFileRemove = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  return (
    <div>
      <h3 className="font-bold mb-2">File Upload</h3>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="w-full border border-gray-300 rounded-md py-2 px-3"
      />
      <ul className="mt-2">
        {files.map((file, index) => (
          <li key={index} className="flex items-center justify-between">
            <span>{file.name}</span>
            <button
              type="button"
              onClick={() => handleFileRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;