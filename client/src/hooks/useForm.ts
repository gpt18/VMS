
import { useState } from 'react';

export const useForm = (initialState: any) => {
  const [data, setData] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
    console.log(data)
  };

  return {
    data,
    handleChange,
    setData,
  };
};