"use client"
import React, { useState } from 'react'
import SectionWrapper from '../SectionWrapper'
import { Plus, Trash } from 'lucide-react'

type Props = {
    skills: string[],
    setSkills: React.Dispatch<React.SetStateAction<string[]>>
}
export default function SkillsSection({ skills, setSkills }: Props) {
    const [skill, setSkill] = useState('');
    const addSkill = () => {
        setSkills(prev => [...prev, skill]);
        setSkill('');
    }
    const removeSkill = (index: number) => {
        setSkills(prev => prev.filter((skill, i) => i !== index))
    }
    return (
        <SectionWrapper id='skills' header='Additional Skills'>
            <div>
                <p className="text-gray-600 text-base text-center mb-4">
                    This section highlights other relevant skills or proficiencies that enhance your professional profile. These may include technical abilities, soft skills, or languages you speak, such as English, Spanish, or French.
                </p>
                <div className="flex items-center gap-2 justify-center bg-indigo-50 rounded-lg p-2 shadow-sm border border-indigo-100 max-w-xl mx-auto">
                    <input
                        id='skill'
                        type="text"
                        name='skill'
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                        placeholder="e.g. Spanish - Advanced"
                        className="flex-1 bg-transparent px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-md"
                    />
                    <button
                        className="p-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer"
                        aria-label="Add skill"
                        title="Add skill"
                        onClick={addSkill}
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
                {skills.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between px-4 py-2 bg-white border border-indigo-200 rounded-full shadow-sm hover:shadow-md transition-all"
                            >
                                <span className="text-sm font-medium text-gray-800 truncate">{skill}</span>
                                <button
                                    onClick={() => removeSkill(index)}
                                    aria-label="Remove skill"
                                    title="Remove skill"
                                    className="text-indigo-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                                >
                                    <Trash className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-5 text-center text-gray-500  border border-dashed border-indigo-200 py-8 px-4 rounded-lg">
                        <p className="text-base">No skills added yet. Add some using the field above.</p>
                    </div>
                )}

            </div>
        </SectionWrapper>
    )
}
