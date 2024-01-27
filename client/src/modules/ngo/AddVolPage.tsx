import React, { useState } from 'react';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { IconSelector } from '../../utils/selector';
import { useNgoDataContext } from '../../hooks/NgoDataContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddVolPage: React.FC = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const  {ngoData} = useNgoDataContext();

  const [volunteer, setVolunteer] = useState({
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
    photo: '',
    aadhar_front: '',
    aadhar_back: '',
    qualification: '',
    experience: '',
    zone: '',
    ngo: ngoData.id,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setVolunteer({ ...volunteer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    
    try {
      setLoading(true);
      const result = await axios.post('/ngo/vol/add', volunteer);
      // setVolunteer({
      //   first_name: '',
      //   last_name: '',
      //   father_name: '',
      //   dob: '',
      //   gender: '',
      //   phone: '',
      //   email: '',
      //   address: '',
      //   city: '',
      //   state: '',
      //   pincode: '',
      //   photo: '',
      //   aadhar_front: '',
      //   aadhar_back: '',
      //   qualification: '',
      //   experience: '',
      //   zone: '',
      //   ngo: ngoData.id,
      // });

      console.log(result)
      toast.success(`Volunteer Added! id: ${result.data}`);

    } catch (error: any) {
      toast.error(error.response.data);
    }
    finally{
      setLoading(false);
    }

    
  };

  return (
    <div className='p-4 md:p-6'>
      <Button variant={'outlined'} startIcon={<IconSelector.all.back/>} onClick={() => navigate(-1)}>Go Back</Button>
      <form onSubmit={handleSubmit} method='post' className="min-w-sm max-w-xl mx-auto px-4 py-3 rounded-md shadow-md bg-white">
        <h2 className="text-2xl mb-4 text-center font-semibold">Add Volunteer</h2>
        <div className='space-y-4'>
          <div className='space-x-2'>
            <label>Zone:</label>
            <select name="zone" value={volunteer.zone} className='shadow-md ring-1 rounded-md' onChange={handleChange} required>
            <option value={undefined}>--Select--</option>
              {ngoData.zone_city.map(zone => <option key={zone}> {zone} </option>)}
            </select>
          </div>
          <TextField type="text" placeholder='First Name' name='first_name' value={volunteer.first_name} onChange={handleChange} required />
          <TextField type="text" placeholder='Last Name' name='last_name' value={volunteer.last_name} onChange={handleChange} />
          <TextField type="text" placeholder='Father Name' name='father_name' value={volunteer.father_name} onChange={handleChange} required />
          <div>
            Date of Birth
            <TextField type="date" placeholder='Date of Birth (DD-MM-YYYY)' name='dob' value={volunteer.dob} onChange={handleChange} required />
          </div>
          <div className="space-x-2">
            <label>Gender:</label>
          <select name="gender" value={volunteer.gender} className='shadow-md ring-1 rounded-md' onChange={handleChange} required>
            <option value={undefined}>--Select--</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          </div>
          <TextField type="phone" placeholder='Phone Number (linked with WhatsApp)' name='phone' value={volunteer.phone} onChange={handleChange} required />
          <TextField type="email" placeholder='Email Address' name='email' value={volunteer.email} onChange={handleChange} required />
          <TextField type="text" placeholder='Address' name='address' value={volunteer.address} onChange={handleChange} required />
          <TextField type="text" placeholder='City' name='city' value={volunteer.city} onChange={handleChange} required />
          <TextField type="text" placeholder='State' name='state' value={volunteer.state} onChange={handleChange} required />
          <TextField type="number" placeholder='Pincode (6 digit)' name='pincode' value={volunteer.pincode} onChange={handleChange} required />
          <div className="space-x-2">
            <label>Qualification:</label>
          <select name="qualification" value={volunteer.qualification} className='shadow-md ring-1 rounded-md' onChange={handleChange} required>
          <option value={undefined}>--Select--</option>
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="Graduation">Graduation</option>
            <option value="Postgraduation">Postgraduation</option>
            <option value="Above">Above</option>
          </select>
          </div>
          <textarea className='w-full ring-1 rounded px-3 py-2' placeholder='Experience (If any)' name='experience' value={volunteer.experience} onChange={handleChange} />
          <div className='space-x-2 flex'>
            <TextField type="text" placeholder='Profile Image URL' name='photo' value={volunteer.photo} onChange={handleChange} />
            <img src={volunteer.photo} alt="photo" className='w-15 h-20 rounded-md' />
          </div>
          <div className='space-x-2 flex'>
            <TextField type="text" placeholder='Addhar Front Image URL' name='aadhar_front' value={volunteer.aadhar_front} onChange={handleChange} />
            <img src={volunteer.aadhar_front} alt="aadhar_front" className='w-25 h-20 rounded-md' />
          </div>
          <div className='space-x-2 flex'>
            <TextField type="text" placeholder='Addhar Back Image URL' name='aadhar_back' value={volunteer.aadhar_back} onChange={handleChange} />
            <img src={volunteer.aadhar_back} alt="aadhar_back" className='w-25 h-20 rounded-md' />
          </div>
        </div>
        <div className="py-4">
          <Button type='submit' size={'large'} className='w-full' variant={loading ? 'disabled' : 'contained'} disabled={loading}>Add Volunteer</Button>
        </div>
      </form>
    </div>
  );
};

export default AddVolPage;