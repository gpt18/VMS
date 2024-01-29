import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconSelector } from '../../utils/selector';
import { Button } from '../../components/Button';
import { Img } from '../../utils/costants';
import { icons } from 'react-icons';
import { PageTitle } from '../../components/PageTitle';

interface Volunteer {
  vol_id: string;
  properties?: {
    name?: {
      first: string;
      last: string;
    };
    father_name?: string;
    dob?: Date;
    gender?: string;
    phone?: string;
    email?: string;
    address?: {
      locality: string;
      city: string;
      state: string;
      pincode: string;
    };
    experience?: string;
    qualification?: string;
    photo?: string;
  };
  // Other properties omitted for brevity
}

interface VolunteerProfileProps {
  volunteer: Volunteer;
}

const VolunteerProfile: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);

  useEffect(() => {
    const fetchVolunteer = async () => {
      try {
        const response = await axios.get(`/ngo/vol/${id}`);
        if (response.data) setVolunteer(response.data);
      } catch (error: any) {
        console.error('Failed to fetch volunteer', error.message);
      }
    };

    fetchVolunteer();
  }, [id]);

  if (!volunteer) return <div className='flex w-full items-center justify-center h-screen'>Loading...</div>;

  return (
    <section id='vol_profile' className='mx-auto max-w-screen-2xl p-4 md:px-6 2xl:px-10'>
      <PageTitle title='Volunteer Profile'/>
      <div className="flex flex-col items-center justify-center py-6">
        <div className="flex flex-col gap-8 w-full max-w-lg sm:max-w-xl">
          <div className='flex flex-col rounded-md bg-white shadow items-start p-6'>
            <div className='mb-4 relative'>
              <div className='absolute right-0 text-xl text-white bg-black rounded-full p-2 ring-1 ring-white'>
                <IconSelector.all.qr />
              </div>
              <div className='w-36 h-36 rounded-full overflow-hidden flex items-center justify-center'>

              <img src={volunteer.properties?.photo || Img.profile_dummy} alt="photo" className='object-cover ' />
              </div>
            </div>
            <div className='text-3xl font-bold mb-1 capitalize'>{volunteer.properties?.name?.first} {" "} {volunteer.properties?.name?.last}</div>
            <div className='text-gray-600 text-sm capitalize'>
            {(volunteer.properties?.gender as string).toLowerCase() === "male" ? "He/him" : "She/her"} {" "}
            &bull; {" "}
            {volunteer.properties?.address?.city}, {volunteer.properties?.address?.state}
            </div>
          </div>
          <div className='rounded-md shadow p-6 bg-white'>
            <div>
              <p className="text-gray-600">Father's Name: {volunteer.properties?.father_name}</p>
              <p className="text-gray-600">Date of Birth: {volunteer.properties?.dob && new Date(volunteer.properties.dob).toLocaleDateString()}</p>
              <p className="text-gray-600">Gender: {volunteer.properties?.gender}</p>
              <p className="text-gray-600">Phone: {volunteer.properties?.phone}</p>
              <p className="text-gray-600">Email: {volunteer.properties?.email}</p>
              <p className="text-gray-600">Address: {volunteer.properties?.address?.locality}, {volunteer.properties?.address?.city}, {volunteer.properties?.address?.state}, {volunteer.properties?.address?.pincode}</p>
              <p className="text-gray-600">Experience: {volunteer.properties?.experience}</p>
              <p className="text-gray-600">Qualification: {volunteer.properties?.qualification}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default VolunteerProfile;