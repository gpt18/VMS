// volunteerService.ts
import axios from 'axios';

export const addVolunteer = async (volunteer: any) => {
  const formData = new FormData();
  if (volunteer.profileImage) {
    formData.append('profileImage', volunteer.profileImage as File);
  }
  if (volunteer.aadharFrontImage) {
    formData.append('aadharFrontImage', volunteer.aadharFrontImage as File);
  }
  if (volunteer.aadharBackImage) {
    formData.append('aadharBackImage', volunteer.profileImage as File);
  }

  for (let key in volunteer) {
    if (volunteer.hasOwnProperty(key) && key !== 'profileImage' && key !== 'aadharFrontImage' && key !== 'aadharBackImage') {
      formData.append(key, volunteer[key]);
    }
  }

  const result = await axios.post('/ngo/vol/add', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return result;
};

export const uploadFile = async (file: any) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await axios.post(`/ngo/upload`, formData);
  return res;
};

export const deleteFile = async (fileName: string) => {
  const res = await axios.delete(`/ngo/file/${fileName}`);
  return res;
};

