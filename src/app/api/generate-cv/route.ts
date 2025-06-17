import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { personalInfo, experiences, studies, skills } = body;
    
    const prompt = `
      You are a professional resume writer and formatter. Based on the user's data below, generate a JSON resume following this structure:

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

      Instructions:
      - Write the summary in **first person**, professional tone. Minimum 3 sentences.
      - The summary should reflect the user's expertise, experience level, industries worked in, key strengths, and highlight professionalism and continuous learning.
      - If any startDate or graduationDate is missing or empty in education, set it to startDate: "Expected graduation:", graduationDate: "Upcoming"".
      - For any missing skill categories (languages, technical, softSkills), infer reasonable values based on the rest of the user's data.
      - For languages, infer the user's native language based on the language of the input data.
      - Each bullet point under experience must start with a **strong verb**, be achievement-oriented, and mention **quantifiable results or technologies/tools used** when possible.
      - Include **3-5 bullet points per job**.
      - If any other field is missing, infer reasonable placeholders based on similar profiles.
      - Be concise but informative.

      Example Summary:
      "I’m a dedicated marketing specialist with over 3 years of experience driving successful digital campaigns and content strategies. I excel at analyzing data to optimize results and enjoy collaborating with teams to innovate marketing approaches. I am passionate about continuous learning and staying up-to-date with industry trends."

      ### Example Bullet Points:
      - Spearheaded migration from legacy PHP system to React/Node.js stack, improving performance by 40%.
      - Collaborated with cross-functional teams to launch a multi-tenant SaaS product serving 10k+ users.
      - Reduced page load time by 35% through code-splitting and lazy loading.
      - Mentored 3 junior developers, leading to a 25% team productivity increase.

      User Data:
      - Personal Info: ${JSON.stringify(personalInfo)}
      - Experience: ${JSON.stringify(experiences)}
      - Education: ${JSON.stringify(studies)}
      - Skills: ${skills.join(', ')}

      Return ONLY a valid JSON object.
  `;

    const result = await generateText({
      model: openai('gpt-4'),
      prompt,
      temperature: 0.7,
    });

    let parsedCV;
    try {
      parsedCV = JSON.parse(result.text);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON returned by OpenAI.' }, { status: 500 });
    }

    return NextResponse.json({ cv: parsedCV });
  } catch (error) {
    console.error('Error generating CV:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
