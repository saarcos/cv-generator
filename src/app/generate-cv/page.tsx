"use client"
import { ExperienceSection } from '@/components/CVWizard/ExperienceSection';
import PersonalInfoSection from '@/components/CVWizard/PersonalInfoSection';
import SkillsSection from '@/components/CVWizard/SkillsSection';
import StudiesSection from '@/components/CVWizard/StudiesSection';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
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
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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
    const handleGenerateCV = async () => {
        setLoading(true);
        try {
            const formData = {
                personalInfo: {
                    fullName: `${personalInformation.firstName} ${personalInformation.lastName}`,
                    phone: personalInformation.phoneNumber,
                    email: personalInformation.email,
                    jobTitle: personalInformation.jobTitle,
                    location: personalInformation.location,
                    linkedin: personalInformation.linkedin,
                },
                experiences: experiences.map(({ jobTitle, employer, startDate, endDate, description }) => ({
                    jobTitle,
                    employer,
                    startDate,
                    endDate,
                    description,
                })),
                studies: studies.map(({ degree, institution, startDate, endDate }) => ({
                    degree,
                    institution,
                    startDate,
                    graduationDate: endDate,
                })),
                skills,
            };
            const response = await axios.post('/api/generate-cv', formData);
            console.log('CV generated:', response.data);
            localStorage.setItem('generatedCV', JSON.stringify(response.data.cv));
            router.push('/cv-preview')
        } catch (error) {
            console.error('Error generating the resume:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <ScrollProgressBar />
            <PersonalInfoSection personalInformation={personalInformation} setPersonalInformation={setPersonalInformation} />
            <ExperienceSection experiences={experiences} setExperiences={setExperiences} />
            <StudiesSection studies={studies} setStudies={setStudies} />
            <SkillsSection skills={skills} setSkills={setSkills} />
            <div className='flex items-center justify-center mb-5'>
                <button disabled={loading} onClick={handleGenerateCV} className='border-2 border-solid border-indigo-600 rounded-full overflow-hidden duration-200 hover:opacity-70 hover:scale-95 cursor-pointer'>
                    <p className='font-fugaz px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 text-indigo-600'>{loading ? "Generating..." : "Generate Resume"}</p>
                </button>
            </div>
        </div>
    )
}
