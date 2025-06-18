"use client"
import React, { useEffect, useState } from 'react';
import { Trash, X } from 'lucide-react';
import AutoResizeTextArea from '@/components/AutoResizeTextArea';
import dayjs from 'dayjs';
import { DownloadResumeButton } from '@/components/pdf/downloadResumeButton';
import LoadingPreview from './LoadingPreview';

export type CV = {
    header: {
        fullName: string;
        location: string;
        phone: string;
        email: string;
        linkedin: string;
    };
    summary: string;
    experience: {
        jobTitle: string;
        employer: string;
        location: string;
        startDate: string;
        endDate: string;
        bullets: string[];
    }[];
    education: {
        institution: string;
        degree: string;
        startDate: string;
        graduationDate: string;
    }[];
    skills: {
        languages: string[];
        technical: string[];
        softSkills: string[];
    };
};

export default function CVPreview() {
    const [cv, setCv] = useState<CV | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('generatedCV');
        if (stored) {
            try {
                setCv(JSON.parse(stored));
            } catch {
                console.error('Error parsing CV from localStorage');
            }
        }
    }, []);

    const handleHeaderChange = (field: keyof CV['header'], value: string) => {
        setCv(prev => prev ? {
            ...prev,
            header: { ...prev.header, [field]: value }
        } : prev);
    };

    const handleBulletChange = (i: number, j: number, value: string) => {
        setCv(prev => {
            if (!prev) return prev;
            const updatedBullets = [...prev.experience[i].bullets];
            updatedBullets[j] = value;
            const updatedExperience = [...prev.experience];
            updatedExperience[i] = { ...updatedExperience[i], bullets: updatedBullets };
            return { ...prev, experience: updatedExperience };
        });
    };

    const handleSkillChange = (category: keyof CV['skills'], index: number, value: string) => {
        setCv(prev => {
            if (!prev) return prev;
            const updatedSkills = [...prev.skills[category]];
            updatedSkills[index] = value;
            return {
                ...prev,
                skills: {
                    ...prev.skills,
                    [category]: updatedSkills
                }
            };
        });
    };

    const handleSummaryChange = (value: string) => {
        setCv(prev => prev ? { ...prev, summary: value } : prev);
    };

    const handleExperienceChange = (i: number, field: keyof CV['experience'][0], value: string) => {
        setCv(prev => {
            if (!prev) return prev;
            const updated = [...prev.experience];
            updated[i] = { ...updated[i], [field]: value };
            return { ...prev, experience: updated };
        });
    };

    const handleEducationChange = (i: number, field: keyof CV['education'][0], value: string) => {
        setCv(prev => {
            if (!prev) return prev;
            const updated = [...prev.education];
            updated[i] = { ...updated[i], [field]: value };
            return { ...prev, education: updated };
        });
    };
    const removeBullet = (i: number, j: number) => {
        setCv(prev => {
            if (!prev) return prev;
            const updatedExperience = [...prev.experience];
            const updatedBullets = updatedExperience[i].bullets.filter((bullet, index) => index !== j)
            updatedExperience[i] = {
                ...updatedExperience[i],
                bullets: updatedBullets
            }
            return { ...prev, experience: updatedExperience };

        })
    }
    const removeSkill = (index: number, category: keyof CV['skills']) => {
        setCv(prev => {
            if (!prev) return prev;
            const updatedSkillCategory = prev.skills[category].filter((skill, i) => i !== index);
            return {
                ...prev, skills: {
                    ...prev.skills,
                    [category]: updatedSkillCategory
                }
            }
        })
    }

    if (!cv) return <LoadingPreview />;

    return (
        <form className="flex flex-col gap-2 px-2 sm:px-4 lg:px-8 py-4">
            <div className="p-6 bg-indigo-50/40 ring-1 ring-indigo-100 rounded-2xl shadow-sm transition-all duration-300">
                <div className="max-w-4xl mx-auto text-center mb-6">
                    <input
                        type="text"
                        value={cv.header.fullName}
                        onChange={(e) => handleHeaderChange('fullName', e.target.value)}
                        className="text-4xl font-bold text-indigo-700  outline-none text-center w-full bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-xl p-1"
                    />
                    <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-2 text-sm text-gray-700 mt-2">
                        <input
                            type="text"
                            value={cv.header.location}
                            onChange={(e) => handleHeaderChange('location', e.target.value)}
                            className="text-center outline-none bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-xl p-1"
                        />
                        <span className="hidden sm:inline">•</span>
                        <input
                            type="email"
                            value={cv.header.email}
                            onChange={(e) => handleHeaderChange('email', e.target.value)}
                            className="text-center text-indigo-600 outline-none bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-xl p-1 md:w-1/4"
                        />
                        <span className="hidden sm:inline">•</span>
                        <input
                            type="text"
                            value={cv.header.phone}
                            onChange={(e) => handleHeaderChange('phone', e.target.value)}
                            className="text-center outline-none bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-xl p-1"
                        />
                    </div>
                    <div className="mt-1">
                        <input
                            type="url"
                            value={cv.header.linkedin}
                            onChange={(e) => handleHeaderChange('linkedin', e.target.value)}
                            className="text-center text-indigo-600 outline-none text-sm w-full bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-xl p-1 mt-1"
                        />
                    </div>
                </div>
                <hr className="border-gray-300 my-4" />
                <AutoResizeTextArea value={cv.summary} onChange={(e) => handleSummaryChange(e.target.value)} className="mb-6 text-gray-700 leading-relaxed outline-none w-full bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-xl p-1" />
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Professional Experience</h2>
                    <hr className="border-gray-300 mb-4" />
                    {cv.experience.map((job, i) => (
                        <div key={i} className="mb-6">
                            <div className='flex items-center justify-between mt-1 gap-2'>
                                <input
                                    type="text"
                                    value={job.jobTitle}
                                    onChange={(e) => handleExperienceChange(i, 'jobTitle', e.target.value)}
                                    className="font-semibold text-lg text-gray-800 outline-none w-full bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-xl p-1"
                                />
                                <input
                                    type="text"
                                    value={job.employer}
                                    onChange={(e) => handleExperienceChange(i, 'employer', e.target.value)}
                                    className="font-medium text-gray-600 outline-none w-full bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-xl p-1"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 gap-2">
                                <input
                                    type="text"
                                    value={job.location}
                                    onChange={(e) => handleExperienceChange(i, 'location', e.target.value)}
                                    className="italic text-sm text-gray-500 outline-none bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-xl p-1"
                                />
                                <div>
                                    <label className='text-sm mr-2'>Start Date:</label>
                                    <input
                                        type="date"
                                        value={job.startDate}
                                        onChange={(e) => handleExperienceChange(i, 'startDate', e.target.value)}
                                        className="italic text-sm text-gray-500 outline-none bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-xl p-1"
                                    />
                                </div>
                                <div>
                                    <label className='text-sm mr-2'>End Date:</label>
                                    <input
                                        type="date"
                                        value={job.endDate}
                                        onChange={(e) => handleExperienceChange(i, 'endDate', e.target.value)}
                                        className="italic text-sm text-gray-500 outline-none bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-xl p-1"
                                    />
                                </div>
                            </div>
                            <ul className="mt-2 text-sm text-gray-700 space-y-2">
                                {job.bullets.map((bullet, j) => (
                                    <li key={j} className="relative flex items-center gap-2 pl-4">
                                        <span className="absolute left-0 text-indigo-600 text-lg leading-none">•</span>

                                        <input
                                            type="text"
                                            value={bullet}
                                            onChange={(e) => handleBulletChange(i, j, e.target.value)}
                                            className="flex-1 outline-none bg-indigo-100 focus:ring-2 focus:ring-indigo-300 rounded-xl p-1"
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                removeBullet(i, j)
                                            }}
                                            aria-label="Remove bullet"
                                            title="Remove bullet"
                                            className="text-indigo-400 hover:text-red-500 transition-colors duration-200 h-6 flex items-center justify-center cursor-pointer"
                                        >
                                            <Trash className="w-5 h-5" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Education</h2>
                    <hr className="border-gray-300 mb-4" />
                    {cv.education.map((edu, i) => (
                        <div key={i} className="mb-4">
                            <div className='flex items-center gap-2 justify-between'>
                                <input
                                    type="text"
                                    value={edu.degree}
                                    onChange={(e) => handleEducationChange(i, 'degree', e.target.value)}
                                    className="font-semibold text-lg text-gray-800 outline-none w-full bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-xl p-1"
                                />
                                <input
                                    type="text"
                                    value={edu.institution}
                                    onChange={(e) => handleEducationChange(i, 'institution', e.target.value)}
                                    className="font-semibold text-lg text-gray-800 outline-none w-full bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-xl p-1"
                                />
                            </div>
                            <div className="italic text-sm text-gray-500 flex flex-wrap items-center gap-2 mt-2">
                                {dayjs(edu.startDate).isValid() && dayjs(edu.graduationDate).isValid() ? (
                                    <>
                                        <input
                                            type="date"
                                            value={edu.startDate}
                                            onChange={(e) => handleEducationChange(i, 'startDate', e.target.value)}
                                            className="outline-none bg-indigo-100 focus:ring-2 focus:ring-indigo-300 rounded-xl px-2 py-1"
                                        />
                                        <span className="text-gray-400">–</span>
                                        <input
                                            type="date"
                                            value={edu.graduationDate}
                                            onChange={(e) => handleEducationChange(i, 'graduationDate', e.target.value)}
                                            className="outline-none bg-indigo-100 focus:ring-2 focus:ring-indigo-300 rounded-xl px-2 py-1"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type="text"
                                            value={edu.startDate}
                                            onChange={(e) => handleEducationChange(i, 'startDate', e.target.value)}
                                            placeholder="Start date or 'TBD'"
                                            className="outline-none bg-indigo-100 focus:ring-2 focus:ring-indigo-300 rounded-xl px-2 py-1"
                                        />
                                        <span className="text-gray-400">–</span>
                                        <input
                                            type="text"
                                            value={edu.graduationDate}
                                            onChange={(e) => handleEducationChange(i, 'graduationDate', e.target.value)}
                                            placeholder="Graduation or 'Coming soon'"
                                            className="outline-none bg-indigo-100 focus:ring-2 focus:ring-indigo-300 rounded-xl px-2 py-1"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                handleEducationChange(i, 'startDate', dayjs().format('YYYY-MM-DD'));
                                                handleEducationChange(i, 'graduationDate', dayjs().format('YYYY-MM-DD'));
                                            }}
                                            className="text-xs text-indigo-600 border border-indigo-600 rounded-full px-3 py-1 hover:bg-indigo-50 transition-all duration-200 cursor-pointer"
                                        >
                                            Add dates
                                        </button>
                                    </>
                                )}
                            </div>

                        </div>
                    ))}
                </section>
                <section>
                    <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Skills</h2>
                    <hr className="border-gray-300 mb-4" />
                    {(['languages', 'technical', 'softSkills'] as const).map((category) => (
                        <div key={category} className="mb-1 flex flex-col gap-2">
                            <span className="font-medium text-gray-800 capitalize">
                                {category === 'softSkills' ? 'Soft Skills' : category}:
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {cv.skills[category].map((skill, index) => (
                                    <div key={index} className="flex items-center gap-1 max-w-full">
                                        <input
                                            type="text"
                                            value={skill}
                                            onChange={(e) => handleSkillChange(category, index, e.target.value)}
                                            className="max-w-full truncate outline-none bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-xl p-1 text-gray-700 font-semibold text-base"
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                removeSkill(index, category);
                                            }}
                                            aria-label="Remove bullet"
                                            title="Remove bullet"
                                            className="text-indigo-400 hover:text-red-500 transition-colors duration-200 h-6 flex items-center justify-center cursor-pointer"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            </div>
            <div className='max-w-3xl mx-auto mt-1'>
                <DownloadResumeButton cvData={cv} />
            </div>
        </form>
    );
}
