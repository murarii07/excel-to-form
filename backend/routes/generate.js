import express from "express";
export const router = express.Router();
import ExcelJS from 'exceljs';
import multer from "multer";
import fs from 'fs';
// // Multer memory storage configuration
const storage = multer.memoryStorage();
const uploads = multer({ storage });

async function fieldCreation(path) {

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(path)
    const worksheet = workbook.getWorksheet(1); //
    // console.log(worksheet)
    // Access the first row
    const firstRow = worksheet.getRow(1);

    // Extract headers from the first row
    const headers = firstRow.values.slice(1);
    return headers;
}


router.post("/", uploads.single('excelFile'), async (req, res) => {
    try {
        console.log(req.file);
        const path = `./uploads/${req.file.originalname}`
        fs.writeFileSync(path, req.file.buffer)
        const headers = await fieldCreation(path)
        // Log or process headers
        console.log('Headers:', headers);
        const obj=[]
        for (const element of headers) {
            
            const fieldJSON={
                labelName:element,
                Id:element,
                Name:element,
                Type:'text'
            }
            obj.push(fieldJSON)

        }
        res
            .status(200)
            .json({
                data: obj,
                success: true,
                message: "successfull...."
            })
    }
    catch (error) {
        res
            .status(200)
            .json({
                data: null,
                success: false,
                message: error
            })

    }
})
