"use client"
import { ExperienceSection } from '@/components/CVWizard/ExperienceSection';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import SectionWrapper from '@/components/SectionWrapper';
import React, { useState } from 'react'
export type Experience = {
    jobTitle: string,
    employer: string,
    startDate: string,
    endDate: string,
    description: string,
    isCollapsed: boolean,
}
export default function CVWizard() {
    const [experiences, setExperiences] = useState<Experience[]>([{
        jobTitle: '',
        employer: '',
        startDate: '',
        endDate: '',
        description: '',
        isCollapsed: false,
    }])
    return (
        <div>
            <ScrollProgressBar />
            <SectionWrapper id="personal-information" header="Personal Information">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2 mb-2">
                        <p className="text-gray-600 text-base text-center">
                            This section gathers your basic personal details. Make sure everything is up to date so employers can easily contact you.
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                            type="text"
                            placeholder="John"
                            className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                            type="text"
                            placeholder="Doe"
                            className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="text"
                            placeholder="+1 234 567 8901"
                            className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="john.doe@example.com"
                            className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                        <input
                            type="text"
                            placeholder="Frontend Developer"
                            className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                            type="text"
                            placeholder="New York, USA"
                            className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                        <input
                            type="url"
                            placeholder="https://linkedin.com/in/johndoe"
                            className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                    </div>
                </div>
            </SectionWrapper>
            <ExperienceSection experiences={experiences} setExperiences={setExperiences} />
        </div>
    )
}
