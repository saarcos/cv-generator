import { z } from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email"),
  jobTitle: z.string().min(1, "Job title is required"),
  location: z.string().min(1, "Location is required"),
  linkedin: z.string().optional(),
});

export const experienceSchema = z.object({
  jobTitle: z.string().min(1),
  employer: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  description: z.string().min(1),
  isCollapsed: z.boolean(),
});

export const studySchema = z.object({
  degree: z.string().min(1),
  institution: z.string().min(1),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  notGraduated: z.boolean(),
  isCollapsed: z.boolean(),
});

export const skillsSchema = z.array(z.string().min(1)).min(1, "At least one skill is required");
