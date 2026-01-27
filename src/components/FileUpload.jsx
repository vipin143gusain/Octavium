export default function FileUpload({ files, setFiles }) {
  const handleUpload = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input type="file" multiple onChange={handleUpload} />

      <div className="mt-2 space-y-2">
        {files.map((file, i) => (
          <div
            key={i}
            className="flex justify-between bg-gray-100 p-2 rounded"
          >
            <span>
              {file.name} ({Math.round(file.size / 1024)}kb)
            </span>
            <button onClick={() => removeFile(i)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
