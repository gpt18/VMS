// useFile.ts
import { useState } from 'react';

export const useFile = (initialState: any) => {
  const [data, setData] = useState(initialState);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData({
          ...data,
          [e.target.name]: {
            file: file,
            file_name: file.name,
            preview: reader.result as string,
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    data,
    handleImageChange,
    setData,
  };
};