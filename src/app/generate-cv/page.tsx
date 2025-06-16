"use client"
import { ExperienceSection } from '@/components/CVWizard/ExperienceSection';
import PersonalInfoSection from '@/components/CVWizard/PersonalInfoSection';
import SkillsSection from '@/components/CVWizard/SkillsSection';
import StudiesSection from '@/components/CVWizard/StudiesSection';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import React, { useEffect, useState } from 'react'
export type PersonalInformation = {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    jobTitle: string,
    location: string,
    linkedin: string,
}
export type Experience = {
    jobTitle: string,
    employer: string,
    startDate: string,
    endDate: string,
    description: string,
    isCollapsed: boolean,
}
export type Studies = {
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    notGraduated: boolean,
    isCollapsed: boolean
}
export default function CVWizard() {
    const [personalInformation, setPersonalInformation] = useState<PersonalInformation>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        jobTitle: '',
        location: '',
        linkedin: '',
    });
    const [experiences, setExperiences] = useState<Experience[]>([{
        jobTitle: '',
        employer: '',
        startDate: '',
        endDate: '',
        description: '',
        isCollapsed: false,
    }]);
    const [studies, setStudies] = useState<Studies[]>([{
        degree: '',
        institution: '',
        startDate: '',
        endDate: '',
        notGraduated: false,
        isCollapsed: false,
    }]);
    const [skills, setSkills] = useState<string[]>([]);
    useEffect(()=>{
        console.log(studies)
    },[studies])
    return (
        <div>
            <ScrollProgressBar />
            <PersonalInfoSection personalInformation={personalInformation} setPersonalInformation={setPersonalInformation} />
            <ExperienceSection experiences={experiences} setExperiences={setExperiences} />
            <StudiesSection studies={studies} setStudies={setStudies} />
            <SkillsSection skills={skills} setSkills={setSkills} />
            <div className='flex items-center justify-center mb-5'>
                <button className='border-2 border-solid border-indigo-600 rounded-full overflow-hidden duration-200 hover:opacity-70 hover:scale-95 cursor-pointer'>
                    <p className='font-fugaz px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 text-indigo-600'>Generate Resume</p>
                </button>
            </div>
        </div>
    )
}
