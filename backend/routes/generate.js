import express from "express";
import ExcelJS from 'exceljs';
import multer from "multer";
import fs from 'fs';
import { randomBytes } from "crypto";
export const router = express.Router();
import { config } from "dotenv";
config();
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

let formIdList = []
router.post("/generate", uploads.single('excelFile'), async (req, res) => {
    try {
        console.log(req.file);
        const path = `./uploads/${req.file.originalname}`
        fs.writeFileSync(path, req.file.buffer)
        const headers = await fieldCreation(path)
        // Log or process headers
        console.log('Headers:', headers);
        const obj = headers.map(element => ({
            LabelName: element,
            Id: element,
            Name: element,
            Type: 'text'
        }))
        let formId = randomBytes(8).toString('hex')
        while (formIdList.some(x => x === formId)) {
            formId = randomBytes(8).toString('hex')
        }
        formIdList.push(formId) //create a id and push in this
        fs.unlinkSync(path) //deleting the xl file
        res
            .cookie('formId', formId, {
                maxAge: 1000 * 60 * 10,  //10minute
                httpOnly: true,
                signed: true,
                sameSite: 'none',
                secure: true, // Only secure in production,
                path: "/"
            })
            .status(200)
            .json({
                data: obj,
                success: true,
                message: "successfull...."
            })
        // console.log(formId)


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
router.get("/download", (req, res) => {
    try {
        const formId = req.signedCookies?.formId;
        console.log(formId)
        if (!formId) {
            return res.status(400).json({ success: false, message: "Cookie not found." });
        }
        const forms = formIdList.find(r => r === formId)
        console.log(formId, forms)
        if (forms) {
            formIdList.splice(formIdList.indexOf(formId), 1)
            res.clearCookie("formId", { signed: true });
            res.status(200).download("public/formTemplate.html");
        }
        else {
            throw new Error("not found");

        }
    }
    catch (e) {
        res
            .status(404)
            .json({
                success: false,
                message: e.message
            })
    }
})
