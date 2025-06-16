import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { personalInfo, experiences, studies, skills } = body;

        const prompt = `
            You are a professional resume writer and formatter. Based on the following user information, generate a JSON object with the following structure:
            {
                "header": {
                    "fullName": string,
                    "location": string,
                    "phone": string,
                    "email": string,
                    "linkedin": string
                },
                "summary": string,
                "experience": [
                    {
                    "jobTitle": string,
                    "employer": string,
                    "location": string,
                    "startDate": string,
                    "endDate": string,
                    "bullets": [string]
                    }
                ],
                "education": [
                    {
                    "institution": string,
                    "degree": string,
                    "startDate": string,
                    "graduationDate": string
                    }
                ],
                "skills": {
                    "languages": [string],
                    "technical": [string],
                    "softSkills": [string]
                }
            }
            Tone should be professional, concise, and achievement-oriented. Write the summary in the first person, and keep each bullet point action-driven, using strong verbs. Follow this example:

            Example summary:
            "I am a software engineer with experience in full-stack development, specializing in React, Node.js, and PostgreSQL. I have worked in international environments and value teamwork, ownership, and continuous learning."

            Example bullet:
            - Developed a scalable web app using React and Node.js, reducing user onboarding time by 30%.

            The user data is:
            - Personal Info: ${JSON.stringify(personalInfo)}
            - Experience: ${JSON.stringify(experiences)}
            - Education: ${JSON.stringify(studies)}
            - Skills: ${skills.join(', ')}

            Return ONLY a valid JSON object. Do not include explanations, apologies, or preambles.
    `;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
            }),
        });

        const data = await response.json();
        const generatedCV = data.choices?.[0]?.message?.content;

        let parsedCV;
        try {
            parsedCV = JSON.parse(generatedCV || '{}');
        } catch {
            return NextResponse.json({ error: "Invalid JSON returned by OpenAI." }, { status: 500 });
        }

        return NextResponse.json({ cv: parsedCV });
    } catch (error) {
        console.error("Error generating CV:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}
