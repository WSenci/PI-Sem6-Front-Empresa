import React, { useState } from "react";

const ImageToBase64: React.FC = () => {
  const [base64, setBase64] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {base64 && (
        <div>
          <h3>Base64 Image:</h3>
          <img src={base64} alt="Base64" style={{ maxWidth: "300px", maxHeight: "300px" }} />
          <textarea value={base64} readOnly rows={10} cols={50} />
        </div>
      )}
    </div>
  );
};

export default ImageToBase64;
