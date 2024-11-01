import { useSelector } from "react-redux";
import Form from "../Molecules/Form";
import { useEffect, useState } from "react";
import Button from "../Atoms/Button";
import { fetchData } from "../fetchData";

const FormUpload = () => {
    const [isEdit, setIsEdit] = useState(true);
    const fields = useSelector(state => state.Field.value)
    const formUpload = async () => {
        try {
            setIsEdit(false)
            const formId = prompt("enter unique formName")
            let ob = { fieldDetails: fields, formId: formId }
            console.log(ob)
            const options = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': "application/json"
                }, body: JSON.stringify(ob)
            }
            const result = await fetchData('http://localhost:5000/user/upload', options)

            if (result.success) {
                console.log(result)
            }
            else {
                throw new Error("error");

            }
        } catch (e) {
            alert("something went wrong")
            console.log(e)
        }
    }

    useEffect(() => {
        console.log(fields)
    })

    return (
        <>
            <div className="upload-button  w-full  mt-5 flex justify-center mb-5">

                <Button name={"upload"} buttonName={`p-1   flex justify-center bg-purple-600 border-purple-600 text-white font-bold s`} onClick={formUpload} />
            </div>
            <div className="MainForm
             mx-auto pl-2 pr-2 w-11/12 box-border flex flex-col">
                <h1 contentEditable={isEdit} className="font-bold text-center text-2xl p-2 ">FORM TITLE</h1>
                <div className="formDescription  text-center " contentEditable={isEdit}   >Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit reiciendis nisi adipisci porro sint cum reprehenderit animi. Rerum, cumque. Iusto soluta dignissimos, dolorum vel fugit repellendus dolorem nesciunt voluptatibus, totam qui quas voluptatum quidem! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, expedita vel est omnis ea dolore dolorum neque, autem blanditiis, natus maxime modi ut nam tempore optio et quidem iure eos sapiente consequuntur voluptate assumenda.</div>
                <Form field={fields} Name={"form1"} buttonName={"Submit"} >

                </ Form>
            </div>
            {/* <footer>footer</footer> */}
        </>
    );
}
export default FormUpload;