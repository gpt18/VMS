// FILEPATH: /c:/Users/guddu/Desktop/Coding/VMS/client/src/components/UserProfileIcon.tsx
import React from 'react';

interface UserProfileIconProps {
  fullName?: string;
  photo?: string;
}

const UserProfileIcon: React.FC<UserProfileIconProps> = ({ fullName, photo }) => {
  const colorList = ['indigo-500','blue-500', 'red-500', 'orange-500', 'purple-500', 'yellow-500', 'green-500'];
  var randomColor = colorList[Math.floor(Math.random() * colorList.length)];

  const getInitials = () => {
    if(fullName) {
        let name  = fullName?.trim();
        
        if(name.length > 0) return `${name[0][0]}${name[1][0]}`.toUpperCase();
        return fullName[0].toUpperCase();
    }else{
        return '!';
    }
  };

  return (
    <div className={`w-12 h-12 rounded-full overflow-hidden bg-${randomColor} flex items-center justify-center text-white text-lg`}>
      <div className='hidden'>
        <div className={`bg-red-500`}></div>
        <div className={`bg-orange-500`}></div>
        <div className={`bg-indigo-500`}></div>
        <div className={`bg-yellow-500`}></div>
        <div className={`bg-purple-500`}></div>
        <div className={`bg-indigo-500`}></div>
        <div className={`bg-green-500`}></div>
      </div>
      {photo ? <img src={photo} alt="Profile" className="object-cover" /> : getInitials()}
    </div>
  );
};

export default UserProfileIcon;