"use client"
import React from 'react'
import SectionWrapper from '../SectionWrapper'
import { Studies } from '@/app/generate-cv/page'
import { ChevronDown, ChevronUp, Trash } from 'lucide-react'
type Props = {
    studies: Studies[],
    setStudies: React.Dispatch<React.SetStateAction<Studies[]>>
}
export default function StudiesSection({ studies, setStudies }: Props) {
    const addDegree = () => {
        setStudies(prev => [...prev, {
            degree: '',
            institution: '',
            startDate: '',
            endDate: '',
            notGraduated: false,
            isCollapsed: true,
        }]);
    };
    const toggleCollapse = (index: number) => {
        setStudies(prev =>
            prev.map((degree, i) =>
                i === index ? { ...degree, isCollapsed: !degree.isCollapsed } : degree
            )
        );
    };
    const removeDegree = (index: number) => {
        setStudies(prev => prev.filter((prev, i) => i !== index));
    };
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const { name, type, value, checked } = e.target;

        const newValue = type === "checkbox" ? checked : value;

        if (type === "checkbox") {
            setStudies(prev => prev.map((study, i) => i === index ? { ...study, startDate: '', endDate: '' } : study))
        }

        setStudies(prev =>
            prev.map((item, i) =>
                i === index ? { ...item, [name]: newValue } : item
            )
        );
    };

    return (
        <SectionWrapper id='studies' header='Studies'>
            <div>
                <div className="sm:col-span-2 mb-2">
                    <p className="text-gray-600 text-base text-center">
                        This section gathers your academic history, focusing on degrees and the institutions you have attended. Emphasize the most relevant qualifications related to the positions you are targeting.
                    </p>
                </div>
                {studies.map((degreeItem, index) => (
                    <div key={index} className='rounded-md p-4 bg-indigo-50/60 mb-4 relative sm:col-span-2'>
                        <div className='flex items-center gap-4'>
                            <button className='flex justify-between items-center w-full cursor-pointer text-gray-600 font-semibold' onClick={() => toggleCollapse(index)}>
                                <p>{degreeItem.degree !== '' && degreeItem.institution !== '' ? `${degreeItem.degree} at ${degreeItem.institution}` : '(Not Specified)'}</p>
                                {degreeItem.isCollapsed ? <ChevronDown /> : <ChevronUp />}
                            </button>
                            <button
                                onClick={() => removeDegree(index)}
                                aria-label="Remove degree"
                                title="Remove degree"
                                className="text-indigo-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                            >
                                <Trash className="w-5 h-5" />
                            </button>
                        </div>
                        {!degreeItem.isCollapsed && (
                            <div className='mt-2 grid grid-cols-1 sm:grid-cols-2 gap-6'>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor='degree'>Degree</label>
                                    <input
                                        id='degree'
                                        name='degree'
                                        value={degreeItem.degree}
                                        onChange={(e) => handleInputChange(e, index)}
                                        type="text"
                                        placeholder="Software Engineer"
                                        className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor='institution'>Institution</label>
                                    <input
                                        id='institution'
                                        name='institution'
                                        value={degreeItem.institution}
                                        onChange={(e) => handleInputChange(e, index)}
                                        type="text"
                                        placeholder="Harvard"
                                        className="w-full bg-indigo-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor='startDate'>Start Date</label>
                                    <input
                                        id='startDate'
                                        name='startDate'
                                        type="date"
                                        value={degreeItem.startDate}
                                        onChange={(e) => handleInputChange(e, index)}
                                        disabled={degreeItem.notGraduated}
                                        className={`w-full rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300
      ${degreeItem.notGraduated ? 'bg-gray-200 cursor-not-allowed text-gray-500' : 'bg-indigo-100'}`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor='endDate'>End Date</label>
                                    <input
                                        id='endDate'
                                        name='endDate'
                                        type="date"
                                        value={degreeItem.endDate}
                                        onChange={(e) => handleInputChange(e, index)}
                                        disabled={degreeItem.notGraduated}
                                        className={`w-full rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300
      ${degreeItem.notGraduated ? 'bg-gray-200 cursor-not-allowed text-gray-500' : 'bg-indigo-100'}`}
                                    />
                                </div>
                                <div className='flex items-center gap-2'>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={`graduated-${index}`}>
                                        I haven&apos;t graduated yet
                                    </label>
                                    <input
                                        name='notGraduated'
                                        id={`graduated-${index}`}
                                        type='checkbox'
                                        checked={degreeItem.notGraduated}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-5 h-5 rounded border-2 cursor-pointer"
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
                    onClick={addDegree}
                >
                    <span className='text-base font-semibold'>Add more</span>
                </button>
            </div>
        </SectionWrapper>
    )
}
