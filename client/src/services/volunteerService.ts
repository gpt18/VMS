// volunteerService.ts
import axios from 'axios';

export const addVolunteer = async (volunteer: any) => {
  const result = await axios.post('/ngo/vol/add', volunteer);
  return result;
};

export const uploadFile = async (file: any) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await axios.post('/ngo/upload', formData);
  return res;
};