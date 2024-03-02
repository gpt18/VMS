import React, { useState } from 'react';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { IconSelector } from '../../utils/selector';
import { useNgoDataContext } from '../../hooks/NgoDataContext';

import { PageTitle } from '../../components/PageTitle';
import { Img } from '../../utils/costants';
import Modal from '../../components/Modal';
import { useFile } from '../../hooks/useFile';
import { addVolunteer, uploadFile } from '../../services/volunteerService';
import { useForm } from '../../hooks/useForm';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const AddVolPage: React.FC = () => {

  const navigate = useNavigate();

  const { newVolData, setNewVolData } = useNgoDataContext();

  function handleComplete() {
    setNewVolData({ ...newVolData, steps: 0 });
    const userResponse = confirm("Do you want to add a new volunteer?")
    if (userResponse) {
      navigate(`/ngo/vol/new`, { replace: true });
    }
    else {
      navigate(`/ngo/vol/${newVolData.user.id}`, { replace: true });
    }
  }


  return (
    <section id="add_vol" className='mx-auto max-w-screen-xl p-4 md:px-6 xl:px-10 relative'>
      <PageTitle title='Add Volunteer' >
        {
          newVolData.steps === 1 &&
          <Button variant={'outlined'} onClick={handleComplete}>Skip Uploads</Button>
        }
      </PageTitle>

      {
        newVolData.steps === 0 ?
          <PersonalDetails /> :
          <UploadImage />
      }

    </section>
  );
};

const PersonalDetails: React.FC = () => {

  const { ngoData, setNgoData, setNewVolData, newVolData } = useNgoDataContext();

  const { data: volunteer, handleChange } = useForm({
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
      setNewVolData({
        steps: newVolData.steps + 1,
        user: {
          id: res.data.id,
          vid: res.data.vid,
          name: volunteer.first_name + " " + volunteer.last_name
        }
      });

      setLoading(false);
      toast.success("Volunteer Added Successfully");
    } catch (error) {
      console.log(error);
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


  async function upload(fileName: string) {
    
    try {
      const res = await uploadFile(files.fileName.file);
      setFileData({
        ...files,
        [fileName]: {
          file_name: res.data.file, preview: res.data.url, uploaded: true
        }
      })
      console.log(res.data);

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
                <label className="flex gap-2 items-center p-2 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
                  <IconSelector.all.image />
                  <span className='text-xs'>
                    {files.photo.file_name ? files.photo.file_name : "Select a image file (.jpg, .png)"}
                  </span>
                  <input type='file' accept='.jpg,.png' name='photo' className="hidden" onChange={handleImageChange} />
                </label>
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
              <Button variant={'dark'} onClick={() => upload('photo')} className='h-10'><IconSelector.all.upload /></Button>
              </div>
            </div>

            {/* --------- upload aadhar image --------- */}

            <div className='border p-2 rounded-md space-y-4'>
              <div>Volunteer Aadhar Image</div>

              {/* ------- fornt aadhar ------- */}
              <div className='flex gap-2 items-center'>
              <div className={`w-16 h-10 shrink-0 ${files.aadharFront.uploaded && 'cursor-pointer'}`}>
                <div className='rounded-md overflow-hidden flex items-center justify-center ring-1 h-full w-full'>
                  <img src={ files.aadharFront.preview || Img.profile_dummy } alt="photo-preview" className='object-cover'
                    onClick={() => {
                      if (files.aadharFront.uploaded) {
                        return window.open(files.aadharFront.preview, 'popup', 'width=600,height=600')
                      }
                    }} />
                </div>
              </div>
              <div className='flex-1'>
                <label className="flex gap-2 items-center p-2 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
                  <IconSelector.all.image />
                  <span className='text-xs'>
                    {files.aadharFront.file_name ? files.aadharFront.file_name : "Select a image file (.jpg, .png)"}
                  </span>
                  <input type='file' accept='.jpg,.png' name='aadharFront' className="hidden" onChange={handleImageChange} />
                </label>
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
              <Button variant={'dark'} onClick={() => upload('aadharFront')} className='h-10'><IconSelector.all.upload /></Button>
              </div>

              {/* ---------- back aadhar --------- */}
              <div className='flex gap-2 items-center'>
              <div className={`w-16 h-10 shrink-0 ${files.photo.uploaded && 'cursor-pointer'}`}>
                <div className='rounded-md overflow-hidden flex items-center justify-center ring-1 h-full w-full'>
                  <img src={files.photo.preview || Img.profile_dummy} alt="photo-preview" className='object-cover'
                    onClick={() => {
                      if (files.photo.uploaded) {
                        return window.open(files.photo.preview, 'popup', 'width=600,height=600')
                      }
                    }} />
                </div>
              </div>
              <div className='flex-1'>
                <label className="flex gap-2 items-center p-2 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
                  <IconSelector.all.image />
                  <span className='text-xs'>
                    {files.photo.file_name ? files.photo.file_name : "Select a image file (.jpg, .png)"}
                  </span>
                  <input type='file' accept='.jpg,.png' name='aadharBack' className="hidden" onChange={handleImageChange} />
                </label>
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
              <Button variant={'dark'} onClick={() => upload('aadharBack')} className='h-10'><IconSelector.all.upload /></Button>
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

const UploadImage: React.FC = () => {

  const { newVolData } = useNgoDataContext();

  const { data: files, handleImageChange, setData } = useFile({
    previewphoto: '',
    photo: '',
    file: '',
    url: '',
  });

  const [uploaded, setUploaded] = useState(false);



  return (
    <div className='mx-auto mt-4 md:mt-6 p-4'>
      <div className='space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4'>

        <div className='md:col-span-2 lg:col-span-1 lg:col-start-1 shadow bg-white'>
          <div className='font-bold bg-red-400 w-full px-2 py-2 rounded-md text-white text-center text-lg'>
            Volunteer
          </div>
          <div className='text-center p-4'>
            <div className='text-xs text-gray-600'>{newVolData.user.id}</div>
            <div className='text-3xl'>{newVolData.user.name}</div>
            <div>
              <div className='text-xs text-gray-600'>VID</div>
              <div className='text-2xl font-semibold'>{newVolData.user.vid}</div>
            </div>
          </div>
        </div>

        {/* profile image upload */}

        <div className='lg:col-start-2 md:col-start-1'>
          <form className='flex flex-col items-center space-y-4' method='post' encType="multipart/form-data" onSubmit={async (e) => {
            e.preventDefault();
            try {
              const res = await uploadFile(files.photo);
              setData({ ...files, file: res.data.file, url: res.data.url })
              console.log(res);
              setUploaded(true);
            } catch (error) {
              console.error(error);
            }

          }}>
            <div className='font-bold bg-gray-400 w-full px-2 py-2 rounded-md text-white text-center text-lg'>
              Upload Profile Photo
            </div>
            <div className='w-36 h-36 mb-4 relative'>
              <div className='absolute right-0 bottom-0 text-xl text-white bg-slate-700/50 rounded-full p-2 ring-1 ring-white'>
                <IconSelector.all.camera />
              </div>
              <div className='rounded-full overflow-hidden flex items-center justify-center ring-1 h-full w-full'>
                <img src={files.previewphoto || Img.profile_dummy} alt="photo-preview" className='object-cover ' />
              </div>
            </div>

            <div className='flex flex-col items-center'>
              <div className='text-5xl'><IconSelector.all.approve /></div>
              <div className='text-2xl'>File Uploaded</div>
            </div>

            <div className='text-xs text-gray-700'>
              <div>{uploaded ? "Profile Photo Uploaded" : "Volunteer Profile Photo"}</div>
              {!uploaded && <TextField type='file' accept='.jpg,.png' name='photo' onChange={handleImageChange} />}
              {uploaded &&
                <div className='text-blue-700 text-sm hover:underline hover:cursor-pointer py-2'
                  onClick={() => window.open(files.url, 'popup', 'width=600,height=600')}>
                  {files.file}
                </div>}
            </div>
            {!uploaded && <Button variant={'dark'} type='submit'>Upload</Button>}

          </form>
        </div>

        <div className="lg:col-start-3 md:col-start-2">
          <form className='space-y-4'>
            <div className='font-bold bg-gray-400 w-full px-2 py-2 rounded-md text-white text-center text-lg'>
              Upload Aadhar
            </div>
            <div className='flex gap-4 text-center'>
              <div className="lg:w-1/2 w-full rounded-lg border-2 border-dashed border-violet-700 p-10">Front</div>
              <div className="lg:w-1/2 w-full rounded-lg border-2 border-dashed border-violet-700 p-10">Back</div>
            </div>
            <div>
              <div className='text-xs text-gray-700'>
                Aadhar Front Photo
              </div>
              <div className='flex gap-2'>
                <TextField type='file' />
                <Button variant={'dark'} ><IconSelector.all.upload /></Button>
              </div>
            </div>
            <div>
              <div className='text-xs text-gray-700'>
                Aadhar Back Photo
              </div>
              <div className='flex gap-2'>
                <TextField type='file' />
                <Button variant={'dark'} ><IconSelector.all.upload /></Button>
              </div>
            </div>

          </form>
        </div>

      </div>
    </div>


  );
}

export default AddVolPage;

