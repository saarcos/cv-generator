export function sanitizeAndParseJSON(raw: string) {
    const trimmed = raw.trim();
    const cleaned = trimmed.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
    try {
        return JSON.parse(cleaned);
    } catch (error) {
        console.error("Failed to parse JSON from AI output:", error);
        throw new Error("Invalid JSON format returned by the model.");
    }
}