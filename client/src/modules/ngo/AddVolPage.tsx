import React, { useState } from 'react';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { IconSelector } from '../../utils/selector';
import { useNgoDataContext } from '../../hooks/NgoDataContext';

import { PageTitle } from '../../components/PageTitle';
import { Img } from '../../utils/costants';
import Modal from '../../components/Modal';
import { useFile } from '../../hooks/useFile';
import { addVolunteer, deleteFile, uploadFile } from '../../services/ngoService';
import { useForm } from '../../hooks/useForm';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const AddVolPage: React.FC = () => {

  return (
    <section id="add_vol" className='mx-auto max-w-screen-xl p-4 md:px-6 xl:px-10 relative'>
      <PageTitle title='Add Volunteer' />
      <PersonalDetails />
    </section>
  );
};

const PersonalDetails: React.FC = () => {
  const navigate = useNavigate();

  function handleComplete() {
    const userResponse = confirm("Do you want to add a new volunteer?")
    if (userResponse) {
      navigate(`/ngo/vol/new`, { replace: true });
    }
    else {
      navigate(`/ngo/vol/${newVolData.user.id}`, { replace: true });
    }
  }

  const { ngoData, setNgoData, newVolData } = useNgoDataContext();

  const { data: volunteer, handleChange, setData: setVolunteerData } = useForm({
    first_name: '',
    last_name: '',
    father_name: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    qualification: '',
    experience: '',
    zone: '',
    ngo: ngoData.id,
    photo: '',
    aadharFront: '',
    aadharBack: '',
  });

  // model and add zone function
  const [isAddZoneOpen, setIsAddZoneOpen] = useState(false);

  const [newZone, setNewZone] = useState('');

  const handleAddZone = (e: React.FormEvent) => {
    e.preventDefault();
    setNgoData({ ...ngoData, zone_city: [...ngoData.zone_city, newZone] });
    setNewZone('');
  }

  const [loading, setLoading] = useState(false);

  const handleSubmitFormOne = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await addVolunteer(volunteer);
      setLoading(false);
      toast.success(`Volunteer Added Successfully with VID: ${res.data.vid}`);
      handleComplete();
    } catch (error: any) {
      toast.error(error.response.data);
      setLoading(false)
    }
  }

  const { data: files, handleImageChange, setData: setFileData } = useFile({
    photo: {
      file: '',
      file_name: '',
      preview: '',
      uploaded: false
    },
    aadharFront: {
      file: '',
      file_name: '',
      preview: '',
      uploaded: false
    },
    aadharBack: {
      file: '',
      file_name: '',
      preview: '',
      uploaded: false
    }
  });


  async function upload(e: React.FormEvent, fileFor: string) {
    e.preventDefault();
    try {
      const res = await uploadFile(files[fileFor].file);
      setFileData({
        ...files,
        [fileFor]: {
          file_name: res.data.file, preview: res.data.url, uploaded: true
        }
      });

      setVolunteerData({
        ...volunteer,
        [fileFor]: res.data.url
      });

    } catch (error) {
      console.error(error);
    }
  }

  async function deleteUpload(e: React.FormEvent, fileFor: string){
    e.preventDefault();
    try {
      const res = await deleteFile(files[fileFor].file_name);
      toast(res.data.message);
      setFileData({
        ...files,
        [fileFor]: {
          file_name: '', preview: '', uploaded: false
        }
      });

      setVolunteerData({
        ...volunteer,
        [fileFor]: ''
      });
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="container mx-auto max-w-lg mt-4 md:mt-6 p-4 bg-white shadow-md rounded">
      <div className='col-span-3 row-span-5'>
        <div className='space-y-6'>
          <div className='flex items-center gap-4'>
            <div className="w-1/2 gap-4 flex">
              <div className='text-gray-600 text-sm font-medium'>Zone</div>
              <select name="zone" value={volunteer.zone} className='shadow-md ring-1 rounded-md' onChange={handleChange} required>
                <option value={''}>--Select--</option>
                {ngoData.zone_city.map(zone => <option key={zone}> {zone} </option>)}
              </select>
            </div>
            <div className="w-1/2 flex gap-2 justify-end">
              <Button variant={'dark'} onClick={() => setIsAddZoneOpen(true)}>Add Zone</Button>
              <Modal isOpen={isAddZoneOpen} onClose={() => setIsAddZoneOpen(false)} title='Add New Zone'>
                <form method='post' onSubmit={handleAddZone}>
                  <div className='text-gray-700 font-medium mb-2'>Zone</div>
                  <div className='flex gap-4'>
                    <TextField placeholder='Zone city' name='zoneCity' value={newZone} onChange={(e) => setNewZone(e.target.value)} required />
                    <Button type='submit' size={'icon'} variant={'dark'} ><IconSelector.all.add /></Button>
                  </div>
                  <div className='py-4'>
                    <div className='font-bold'>Currently Available Zones</div>
                    {ngoData.zone_city.map((city) => {
                      return <p key={city}>{`\u2713 ${city}`}</p>
                    })}
                  </div>
                </form>
              </Modal>
            </div>
          </div>

          <form onSubmit={handleSubmitFormOne} className='space-y-6'>

            <div className='space-y-2 md:space-y-0 md:flex justify-evenly gap-2'>
              <TextField type="text" placeholder='First Name' name='first_name' value={volunteer.first_name} onChange={handleChange} required />
              <TextField type="text" placeholder='Last Name' name='last_name' value={volunteer.last_name} onChange={handleChange} />
              <TextField type="text" placeholder='Father Name' name='father_name' value={volunteer.father_name} onChange={handleChange} required />
            </div>

            <div className='flex flex-col gap-2 overflow-x-hidden py-1'>
              <div className='flex items-center'>
                <div className='text-gray-600 text-sm font-medium w-1/2'>Date of Birth</div>
                <TextField className="w-1/2" type="date" placeholder='Date of Birth (DD-MM-YYYY)' name='dob' value={volunteer.dob} onChange={handleChange} required />
              </div>
              <div className='flex items-center'>
                <div className='text-gray-600 text-sm font-medium w-1/2'>Gender</div>
                <select name="gender" value={volunteer.gender} className='shadow-md ring-1 rounded-md' onChange={handleChange} required>
                  <option value={''}>--Select--</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className='flex items-center'>
                <div className='text-gray-600 text-sm font-medium w-1/2'>Qualification</div>
                <select name="qualification" value={volunteer.qualification} className='shadow-md ring-1 rounded-md' onChange={handleChange} required>
                  <option value={''}>--Select--</option>
                  <option value="10th">10th</option>
                  <option value="12th">12th</option>
                  <option value="Graduation">Graduation</option>
                  <option value="Postgraduation">Postgraduation</option>
                  <option value="Above">Above</option>
                </select>
              </div>
            </div>

            <div className='space-y-2 md:space-y-0 md:flex justify-evenly gap-2'>
              <TextField type="phone" placeholder='Phone Number (linked with WhatsApp)' name='phone' value={volunteer.phone} onChange={handleChange} required />
              <TextField type="email" placeholder='Email Address' name='email' value={volunteer.email} onChange={handleChange} required />
            </div>

            <TextField type="text" placeholder='Address' name='address' value={volunteer.address} onChange={handleChange} required />

            <div className='space-y-2 md:space-y-0 md:flex justify-evenly gap-2'>
              <TextField type="text" placeholder='City' name='city' value={volunteer.city} onChange={handleChange} required />
              <TextField type="text" placeholder='State' name='state' value={volunteer.state} onChange={handleChange} required />
              <TextField type="number" placeholder='Pincode (6 digit)' name='pincode' value={volunteer.pincode} onChange={handleChange} required />
            </div>

            <textarea className='w-full ring-1 rounded px-3 py-2' placeholder='Experience (If any)' name='experience' value={volunteer.experience} onChange={handleChange} />

            {/* ------ uploads profile image -------- */}

            <div className='border p-2 rounded-md space-y-4'>
              <div className='mb-2'>Volunteer Profile Photo</div>
              <div className='flex gap-2 items-center'>
                <div className={`w-10 h-10 shrink-0 ${files.photo.uploaded && 'cursor-pointer'}`}>
                  <div className='rounded-full overflow-hidden flex items-center justify-center ring-1 h-full w-full'>
                    <img src={files.photo.preview || Img.profile_dummy} alt="photo-preview" className='object-cover'
                      onClick={() => {
                        if (files.photo.uploaded) {
                          return window.open(files.photo.preview, 'popup', 'width=600,height=600')
                        }
                      }} />
                  </div>
                </div>
                <div className='flex-1'>
                  
                  {
                    !files.photo.uploaded ?
                      <label className="flex gap-2 items-center p-2 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
                        <IconSelector.all.image />
                        <span className='text-xs'>
                        {files.photo.file_name ? files.photo.file_name : "Select an image file (.jpg, .png)"}
                        </span>
                        <input type='file' accept='.jpg,.png' name='photo' className="hidden" onChange={handleImageChange} />
                      </label> :
                      <div className='text-xs text-blue-500'>
                        {files.photo.file_name}
                      </div>
                  }

                  {
                    files.photo.uploaded &&
                    <div className='flex gap-1 py-1'>
                      <IconSelector.all.approve />
                      <div className='text-xs'>
                        Image Uploaded Successfully
                      </div>
                    </div>
                  }
                </div>
                {
                  !files.photo.uploaded ?
                    <Button variant={'dark'} onClick={(e) => upload(e, 'photo')} className='h-10' disabled={!files.photo.file}><IconSelector.all.upload /></Button> :
                    <Button className='h-10 bg-red-500 text-white hover:bg-red-700' onClick={(e) => deleteUpload(e, 'photo')}><IconSelector.all.delete /></Button>
                }

              </div>
            </div>

            {/* --------- upload aadhar image --------- */}

            <div className='border p-2 rounded-md space-y-4'>
              <div>Volunteer Aadhar Image</div>

              {/* ------- fornt aadhar ------- */}
              <div className='flex gap-2 items-center'>
                <div className={`w-16 h-10 shrink-0 ${files.aadharFront.uploaded && 'cursor-pointer'}`}>
                  <div className='rounded-md overflow-hidden flex items-center justify-center ring-1 h-full w-full'>
                    <img src={files.aadharFront.preview || Img.profile_dummy} alt="aadharFront-preview" className='object-cover'
                      onClick={() => {
                        if (files.aadharFront.uploaded) {
                          return window.open(files.aadharFront.preview, 'popup', 'width=600,height=600')
                        }
                      }} />
                  </div>
                </div>
                <div className='flex-1'>
                  {
                    !files.aadharFront.uploaded ?
                      <label className="flex gap-2 items-center p-2 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
                        <IconSelector.all.image />
                        <span className='text-xs'>
                        {files.aadharFront.file_name ? files.aadharFront.file_name : "Select Front Aadhar image file"}
                        </span>
                        <input type='file' accept='.jpg,.png' name='aadharFront' className="hidden" onChange={handleImageChange} />
                      </label> :
                      <div className='text-xs text-blue-500'>
                        {files.aadharFront.file_name}
                      </div>
                  }

                  {
                    files.aadharFront.uploaded &&
                    <div className='flex gap-1 py-1'>
                      <IconSelector.all.approve />
                      <div className='text-xs'>
                        Image Uploaded Successfully
                      </div>
                    </div>
                  }
                </div>
                {
                  !files.aadharFront.uploaded ?
                    <Button variant={'dark'} onClick={(e) => upload(e, 'aadharFront')} className='h-10' disabled={!files.aadharFront.file}><IconSelector.all.upload /></Button> :
                    <Button className='h-10 bg-red-500 text-white hover:bg-red-700' onClick={(e) => deleteUpload(e, 'aadharFront')}><IconSelector.all.delete /></Button>
                }

              </div>

              {/* ---------- back aadhar --------- */}
              <div className='flex gap-2 items-center'>
                <div className={`w-16 h-10 shrink-0 ${files.aadharBack.uploaded && 'cursor-pointer'}`}>
                  <div className='rounded-md overflow-hidden flex items-center justify-center ring-1 h-full w-full'>
                    <img src={files.aadharBack.preview || Img.profile_dummy} alt="aadharBack-preview" className='object-cover'
                      onClick={() => {
                        if (files.aadharBack.uploaded) {
                          return window.open(files.aadharBack.preview, 'popup', 'width=600,height=600')
                        }
                      }} />
                  </div>
                </div>
                <div className='flex-1'>
                {
                    !files.aadharBack.uploaded ?
                      <label className="flex gap-2 items-center p-2 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
                        <IconSelector.all.image />
                        <span className='text-xs'>
                        {files.aadharBack.file_name ? files.aadharBack.file_name : "Select Back Aadhar image file"}
                        </span>
                        <input type='file' accept='.jpg,.png' name='aadharBack' className="hidden" onChange={handleImageChange} />
                      </label> :
                      <div className='text-xs text-blue-500'>
                        {files.aadharBack.file_name}
                      </div>
                  }

                  {
                    files.aadharBack.uploaded &&
                    <div className='flex gap-1 py-1'>
                      <IconSelector.all.approve />
                      <div className='text-xs'>
                        Image Uploaded Successfully
                      </div>
                    </div>
                  }
                </div>
                {
                  !files.aadharBack.uploaded ?
                    <Button variant={'dark'} onClick={(e) => upload(e, 'aadharBack')} className='h-10' disabled={!files.aadharBack.file}><IconSelector.all.upload /></Button> :
                    <Button className='h-10 bg-red-500 text-white hover:bg-red-700' onClick={(e) => deleteUpload(e, 'aadharBack')}><IconSelector.all.delete /></Button>
                }
              </div>
            </div>

            {/* ------ Form Button ------ */}

            <Button type='submit' size={'large'} className={`w-full`} variant={loading ? 'disabled' : 'contained'} disabled={loading}>Add Volunteer</Button>
          </form>

        </div>
      </div>

    </div>
  );
}

export default AddVolPage;

