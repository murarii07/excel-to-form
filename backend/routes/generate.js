import express from "express";
import ExcelJS from 'exceljs';
import multer from "multer";
import fs from 'fs';
import { Formlist } from "../temp.js";
export const router = express.Router();
import { config } from "dotenv";
config();
// // Multer memory storage configuration
const storage = multer.memoryStorage();
const uploads = multer({ storage });


const FormListObj = new Formlist()

async function fieldCreation(path) {
    try {

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(path)
        const worksheet = workbook.getWorksheet(1); //
        // console.log(worksheet)
        // Access the first row
        const firstRow = worksheet.getRow(1);
        // Extract headers from the first row
        const headers = firstRow.values.slice(1);
        return headers;
    } catch (e) {
        throw new Error(e.message);

    }
}
router.post("/generate", uploads.single('excelFile'), async (req, res) => {
    let formId = FormListObj.generateUniqueElement()
    try {
        if (!fs.existsSync("./uploads")) {
            fs.mkdirSync("./uploads")
        }

        console.log(req.file);
        const path = `./uploads/${formId}.xlsx`
        console.log(path)
        fs.writeFileSync(path, req.file.buffer)
        const headers = await fieldCreation(path)
        // Log or process headers
        console.log('Headers:', headers);
        const obj = headers.map(element => ({
            LabelName: element.replace(/\s/g, ""),
            Id: element.replace(/\-/g, '_').replace(/\s/g, ""),
            Name: element.replace(/\-/g, '_').replace(/\s/g, ""),
            Type:  RegExp(/date/).test(element)?"date":"text"
        }))
        FormListObj.add(formId) //create a id and push in this

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
                message: error.message
            })

    }
    finally {
        if (fs.existsSync(`./uploads/${formId}.xlsx`)) {
            fs.unlinkSync(`./uploads/${formId}.xlsx`) //deleting the xl file
        }
    }
})
router.get("/download", (req, res) => {
    try {
        const formId = req.signedCookies?.formId;
        console.log(formId)
        if (!formId) {
            return res.status(400).json({ success: false, message: "Cookie not found." });
        }
        const forms = FormListObj.find(formId)
        console.log(formId, forms)
        if (forms) {
            FormListObj.remove(formId)
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
