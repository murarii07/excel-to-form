import express from "express";
import ExcelJS from 'exceljs';
import multer from "multer";
import fs from 'fs';
export const router = express.Router();
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

const formId=[]
router.post("/generate", uploads.single('excelFile'), async (req, res) => {
    try {
        console.log(req.file);
        const path = `./uploads/${req.file.originalname}`
        fs.writeFileSync(path, req.file.buffer)
        const headers = await fieldCreation(path)
        // Log or process headers
        console.log('Headers:', headers);
        const obj=headers.map(element=>({
            labelName:element,
            Id:element,
            Name:element,
            Type:'text'
        }))
        formId.push("12345") //create a id and push in this
        fs.unlinkSync(path) //deleting the xl file
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
            .status(404)
            .json({
                data: null,
                success: false,
                message: error
            })

    }
})
router.get("/download/:id", (req, res) => {
    
    const forms=formId.filter(r=>r===req.params.id)
    if(forms[0]){
        formId=formId.filter(r=>r!==req.params.id);
        res.status(200).download("formTemplate.html");
    }
    else{

        res
            .status(404)
            .json({
                success: false,
                message: "Error..."
            })
    }
})
