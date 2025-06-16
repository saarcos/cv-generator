import React from 'react'
import SectionWrapper from '../SectionWrapper'
import { PersonalInformation } from '@/app/generate-cv/page'
type Props = {
    personalInformation: PersonalInformation,
    setPersonalInformation: React.Dispatch<React.SetStateAction<PersonalInformation>>,
};
export default function PersonalInfoSection({ personalInformation, setPersonalInformation }: Props) {
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPersonalInformation(prev => ({
            ...prev,
            [name]: value
        }));
    };
    return (
        <SectionWrapper id="personal-information" header="Personal Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2 mb-2">
                    <p className="text-gray-600 text-base text-center">
                        This section gathers your personal details. Make sure everything is up to date so employers can contact you.
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor='firstName'>First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        name='firstName'
                        value={personalInformation.firstName}
                        onChange={handleOnChange}
                        placeholder="John"
                        className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor='lastName'>Last Name</label>
                    <input
                        id='lastName'
                        type="text"
                        name='lastName'
                        value={personalInformation.lastName}
                        onChange={handleOnChange}
                        placeholder="Doe"
                        className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor='phoneNumber'>Phone Number</label>
                    <input
                        id='phoneNumber'
                        type="text"
                        name='phoneNumber'
                        value={personalInformation.phoneNumber}
                        onChange={handleOnChange}
                        placeholder="+1 234 567 8901"
                        className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor='email'>Email Address</label>
                    <input
                        id='email'
                        type="email"
                        name='email'
                        value={personalInformation.email}
                        onChange={handleOnChange}
                        placeholder="john.doe@example.com"
                        className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                </div>
                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor='jobTitle'>Job Title</label>
                    <input
                        id='jobTitle'
                        type="text"
                        name='jobTitle'
                        value={personalInformation.jobTitle}
                        onChange={handleOnChange}
                        placeholder="Frontend Developer"
                        className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                </div>
                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor='location'>Location</label>
                    <input
                        id='location'
                        type="text"
                        name='location'
                        value={personalInformation.location}
                        onChange={handleOnChange}
                        placeholder="New York, USA"
                        className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                </div>
                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor='linkedin'>LinkedIn Profile</label>
                    <input
                        id='linkedin'
                        type="url"
                        name='linkedin'
                        value={personalInformation.linkedin}
                        onChange={handleOnChange}
                        placeholder="https://linkedin.com/in/johndoe"
                        className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                </div>
            </div>
        </SectionWrapper>
    )
}
