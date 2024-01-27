import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Volunteer {
  vol_id: string;
  properties: {
    name: {
      first: string;
      last: string;
    };
    father_name: string;
    dob: Date;
    gender: string;
    phone: string;
    email: string;
    address: {
      locality: string;
      city: string;
      state: string;
      pincode: string;
    };
    experience: string;
    qualification: string;
    photo: string;
  };
  // Other properties omitted for brevity
}

interface VolunteerProfileProps {
  volunteer: Volunteer;
}

const VolunteerProfile: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const [volunteer, setVolunteer] = useState<Volunteer | null>(null)

    useEffect(() => {
        const fetchVolunteer = async () => {
            try {
                const response = await axios.get(`/ngo/vol/${id}`);
                setVolunteer(response.data);
            } catch (error) {
                console.error('Failed to fetch volunteer', error)
            }
        };

        fetchVolunteer();
    }, [id]);

    if(!volunteer) return <div>Loading...</div>

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src={volunteer.properties.photo} alt="Volunteer" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 capitalize">
            {volunteer.properties.name.first} {volunteer.properties.name.last}
          </h2>
        </div>
        <div className="rounded-md shadow-sm -space-y-px px-3 py-2">
          <div>
            <p className="text-gray-600">Father's Name: {volunteer.properties.father_name}</p>
            <p className="text-gray-600">Date of Birth: {new Date(volunteer.properties.dob).toLocaleDateString()}</p>
            <p className="text-gray-600">Gender: {"volunteer.properties.gender"}</p>
            <p className="text-gray-600">Phone: {"volunteer.properties.phone"}</p>
            <p className="text-gray-600">Email: {"volunteer.properties.email"}</p>
            <p className="text-gray-600">Address: {"volunteer.properties.address.locality"}, {"volunteer.properties.address.city"}, {"volunteer.properties.address.state"}, {"volunteer.properties.address.pincode"}</p>
            <p className="text-gray-600">Experience: {"volunteer.properties.experience"}</p>
            <p className="text-gray-600">Qualification: {"volunteer.properties.qualification"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfile;