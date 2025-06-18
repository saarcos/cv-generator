import { sanitizeAndParseJSON } from "@/utils/sanitizeJson";

describe('sanitizeAndParseJSON', () => {
    it('should extract and parse a valid json string with the surrounding text', () => {
        const input = "```json\n{\n  \"name\": \"Sebastián\",\n  \"role\": \"Developer\"\n}\n```";
        const result = sanitizeAndParseJSON(input);
        expect(result).toEqual({
            name: "Sebastián",
            role: "Developer"
        })
    })
    it('should throw an error if the json format provided is not valid', () => {
        const input = `No json here`;
        expect(() => sanitizeAndParseJSON(input)).toThrow("Invalid JSON format returned by the model.");
    })
})