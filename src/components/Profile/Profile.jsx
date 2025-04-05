import { useState } from "react";

export default function Profile() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex items-center justify-center border">
      <div className="p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold border-b pb-4 mb-4 dark:border-gray-600">Profile Details</h2>
        <div className="space-y-6">
          <ProfileItem label="Full Name" value="Your name" />
          <ProfileItem label="Mobile Number" value="93XXXXXXXX" />
          <ProfileItem label="Email ID" value="youremail@gmail.com" />
          <ProfileItem label="Gender" value="- not added -" />
          <ProfileItem label="Date of Birth" value="- not added -" />
          <ProfileItem label="Location" value="- not added -" />
          <ProfileItem label="Alternate Mobile" value="- not added -" />
          <ProfileItem label="Hint Name" value="- not added -" />
        </div>
        <button className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-1 rounded-md">
          EDIT
        </button>
      </div>
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-sm">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  );
}
