import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
config()
import fs from 'fs'
import ExcelJS from 'exceljs';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// console.log(prompts)

const responseGeneration = async (csvContent) => {
    const prompts = fs.readFileSync("/home/murarii/codeBase/collegeCodebase/excel-to-form/backend/src/ModifyPrompt.txt", "utf-8")
    const result = await model.generateContentStream(csvContent + prompts);
    const rr = fs.createWriteStream("./ss.json")
    for await (const chunk of result.stream) {
        // Best for Streaming
        // console.log(chunk.candidates[0].content.parts[0].text)
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
    // const workbook = new ExcelJS.Workbook();
    // await workbook.xlsx.readFile(path);
    // const worksheet = workbook.getWorksheet(1);
    // // console.log(worksheet)
    // if (worksheet.rowCount < 2) {
    //     console.log("file is too short")
    //     return;
    // }
    // // const values = worksheet.getRows(1);
    let r;
    worksheet.eachRow((row) => {
        let rowValues = row.values.slice(1)
        r = r + rowValues.join(",") + "\n"
        // csvFile.write(rowValues);

    })
    // fs.writeFileSync(`./uploads/${filename}.csv`, r)
    return r //returning the excel data in csv format
    // for()
    // const f = values.values.slice(1)
    // let r = f.join(",")
    // for (const element of values.entries()) {
    //     console.log(element)
    // }

}
// fieldCreationWhenData()


// responseGeneration(` 
//     Full name of the student,Gender,Age,PNR No,Coach NO,Seat No
// Prince sharma,MALE,19,,G6,1
// Vedant Sandeep Bobhate,MALE,19,,G6,2
// Dhruvi Bhushan Parmar,FEMALE,20,,G6,3
// Kavyashree Kolambekar,FEMALE,19,,G6,4
// Shailee Shashikant Mane,FEMALE,19,,G6,5
// Poonam Banshilal Lohar,FEMALE,21,,G6,6
// Pallavi Sanjay Waje,FEMALE,20,,G6,7
// Anjali asharfilal varun,FEMALE,20,,G6,8
// Bhupen Surendra Bhagat,MALE,19,,G6,9
// Sachin Santosh Yadav,MALE,21,,G6,10
// Azimuddeen Khan,MALE,19,,G6,11
// Rudra Vishal Patil,MALE,20,,G6,12
// Korde Mayur Dhavlu,MALE,20,,G6,13
// Piyush Sunil Chaudhari,MALE,20,,G6,14
// Nikhil Sambhaji Chavan,MALE,20,,G6,15
// Sanjana Rajendra Sawant,FEMALE,21,8912196167,G6,16
// Sahil Sanjay Nandgaonkar,MALE,20,,G6,17
// Sumit Dinesh Gaikwad,MALE,20,,G6,18
// Yash Prashant Rasal,MALE,19,,G6,19
// Ashish Giri,MALE,21,,G6,20
// Manasi Sanjay Rajguru,FEMALE,21,,G6,21
// Mansvi Deepak Anjarlekar,FEMALE,20,,G6,22
// Siddhi santosh supekar,FEMALE,20,,G6,23
// Tiwari Pragya Kamlesh Kumar,FEMALE,19,,G6,24
// Riya choudhary,FEMALE,20,,G6,25
// Rawat Esha Rameshsingh,FEMALE,20,,G6,26
// Arya Shekhar Parab,FEMALE,19,,G6,27
// Swapnali Anaji Dalvi,FEMALE,20,,G6,28
// Saloni Sharad Gaikwad,FEMALE,19,,G6,29
// Harsh Jogendra Yadav,MALE,19,,G6,30
// Shobhit Kori,MALE,20,,G6,31
// Abhishek Jaykumar Kahar,MALE,20,,G6,32
// Meet Dewedi ,MALE,20,,G6,33
// Yash Nilesh Chudasama,MALE,20,8423979131,G6,34
// Yuval ujval chaudhari,MALE,20,,G6,35
// Gupta Sanjana Sanjay,FEMALE,19,,G6,36
// MahendraSingh RoadSingh Dasana,MALE,20,,G6,37
// Ritu Chunilal Kori,FEMALE,19,,G6,38
// Abhay Omprakash jaiswal,MALE,20,,G6,39
// Mehek Kiran Gupta,FEMALE,19,,G6,40
// Pinki Satyanarayan Yadav,FEMALE,21,,G6,41
// Kanchan Pratik Shivram,MALE,20,,G6,42
// Atmaram Santosh Sawant,MALE,19,8804730181,G6,43
// Sharma Kirti Sandeep Rajni,FEMALE,19,,G6,44
// Simran Rajesh Londhe,FEMALE,19,,G6,45
// Unmani Santosh Nandoskar,FEMALE,19,,G6,46
// Saeesha Vijay Bagwe,FEMALE,18,,G6,47
// Sayali Vijay Pol,FEMALE,19,,G6,48
// Ankit Patel,MALE,21,,G6,56
// Shruti Shivaji Pawar,FEMALE,20,8223979668,G6,57
// Purva Ramchandra Pawaskar,FEMALE,19,,G6,58
// Ketan Jaywant Rane,MALE,19,,G6,59
// Megha Banne,FEMALE,18,,G6,60
// panchal hiral harshad hasumati,FEMALE,19,,G6,62
// Khushi Ganesh Suvarna,FEMALE,19,,G6,63
// Nikhil Subhash Bagul,MALE,19,,G6,65
// Durva Dilip Jadhav,FEMALE,18,,G6,66
// RIYA SUBHASH BHUTAL,FEMALE,19,8423979671,G6,67
// Viraj Khandekar,MALE,20,,G6,68
// Arjun Arun Chavan,MALE,19,,G6,69
// Ghanshyam yashraj singh,MALE,21,,G6,71
// Dhruv DineshChandra Singh,MALE,19,,G6,72
// Dhanraj vijay shinde,MALE,20,,G6,74
// Chaitali Raosaheb Patil,FEMALE,18,,G6,75
// Dhanjal Paramjeet kaur Inderjeet Singh,FEMALE,18,,G6,76
// Aaryan Mulchand Nagda,MALE,19,,G6,77`)


export { excelToCSVConversion, responseGeneration }