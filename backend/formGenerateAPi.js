import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
config()
import fs from 'fs'
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// console.log(prompts)

const responseGeneration = async (csvContent) => {
    const prompts = fs.readFileSync("../backend/src/ModifyPrompt.txt", "utf-8")
    const result = await model.generateContentStream(csvContent + prompts);
    const rr = fs.createWriteStream("./ss.json")
    for await (const chunk of result.stream) {
        // Best for Streaming
        console.log(chunk.candidates[0].content.parts[0].text)
        let r = chunk.candidates[0].content.parts[0].text

        process.stdout.write(r); // Print streamed text
        r = r.replace(/```/g, "").trim() //trim() remvoing white spaces
        r = r.replace(/^json/i, "").trim()  // Removes "json" if it's the first word
        rr.write(r)
    }
    rr.end()
    const readingJSONFile = fs.readFileSync("./ss.json", "utf-8")
    let objRespo = JSON.parse(readingJSONFile)
    return (objRespo) //retruning object
}

//if excel has data more than 5
async function excelToCSVConversion(worksheet) {
    let r;
    worksheet.eachRow((row) => {
        let rowValues = row.values.slice(1)
        r = r + rowValues.join(",") + "\n"
        // csvFile.write(rowValues);

    })
    return r //returning the excel data in csv format

}
// fieldCreationWhenData()

const reas = fs.readFileSync("../backend/src/ModifyPrompt.txt", "utf-8")
console.log(reas)

export { excelToCSVConversion, responseGeneration }