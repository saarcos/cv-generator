import React from 'react'
import SectionWrapper from '../SectionWrapper'
import { Experience } from '@/app/generate-cv/page'
import { ChevronDown, ChevronUp, Trash } from 'lucide-react'
type Props = {
    experiences: Experience[],
    setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>
}
export const ExperienceSection = ({ experiences, setExperiences }: Props) => {
    const toggleCollapse = (index: number) => {
        setExperiences(prev =>
            prev.map((exp, i) =>
                i === index ? { ...exp, isCollapsed: !exp.isCollapsed } : exp
            )
        )
    };
    const addExperience = () => {
        setExperiences(prev => [...prev, {
            jobTitle: '',
            employer: '',
            startDate: '',
            endDate: '',
            description: '',
            isCollapsed: true,
        }])
    };
    const removeExperience = (index: number) => {
        setExperiences(prev => prev.filter((experience, i) => i !== index));
    };
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        const { name, value } = e.target;
        setExperiences(prev =>
            prev.map((experience, i) =>
                i === index ? { ...experience, [name]: value } : experience
            )
        );
    };
    return (
        <SectionWrapper id="experience" header="Employment history">
            <div>
                <div className="sm:col-span-2 mb-2">
                    <p className="text-gray-600 text-base text-center">
                        Describe your past roles, employers, and key achievements to showcase your professional experience.
                    </p>
                </div>
                {experiences.map((experience, index) => (
                    <div key={index} className="rounded-md p-4 bg-indigo-50/60 mb-4 relative sm:col-span-2">
                        <div className='flex items-center gap-4'>
                            <button className='flex justify-between items-center w-full cursor-pointer text-gray-600 font-semibold' onClick={() => toggleCollapse(index)}>
                                <p>{experience.jobTitle !== '' && experience.employer !== '' ? `${experience.jobTitle} at ${experience.employer}` : '(Not Specified)'}</p>
                                {experience.isCollapsed ? <ChevronDown /> : <ChevronUp />}
                            </button>
                            <button
                                onClick={() => removeExperience(index)}
                                aria-label="Remove job"
                                title="Remove job"
                                className="text-indigo-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                            >
                                <Trash className="w-5 h-5" />
                            </button>
                        </div>
                        {!experience.isCollapsed && (
                            <div className='mt-2 grid grid-cols-1 sm:grid-cols-2 gap-6'>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                    <input
                                        name="jobTitle"
                                        value={experience.jobTitle}
                                        onChange={(e) => handleInputChange(e, index)}
                                        type="text"
                                        placeholder="Frontend Developer"
                                        className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Employer</label>
                                    <input
                                        name="employer"
                                        value={experience.employer}
                                        onChange={(e) => handleInputChange(e, index)}
                                        type="text"
                                        placeholder="Google"
                                        className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                    <input
                                        name='startDate'
                                        type="date"
                                        value={experience.startDate}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                    <input
                                        name='endDate'
                                        type="date"
                                        value={experience.endDate}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        name='description'
                                        value={experience.description}
                                        onChange={(e) => handleInputChange(e, index)}
                                        placeholder="Implemented full stack applications..."
                                        className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className='flex justify-center sm:col-span-2'>
                <button
                    className='flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-indigo-700 transition-colors duration-200 cursor-pointer'
                    onClick={addExperience}
                >
                    <span className='text-base font-semibold'>Add more</span>
                </button>
            </div>
        </SectionWrapper>
    )
}
