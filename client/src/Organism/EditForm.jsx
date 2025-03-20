import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import EditBox from "../Molecules/editBox";
import { addSpecificField, changeFieldValue, removeSpecificField } from "../redux/formElement";
import { useNavigate } from "react-router-dom";
import useDebounce from "../CustomHooks/debounce";
const toolboxFields = [
    { Id: `file`, LabelName: "file", Type: "file", Name: "file", icon: "files", },
    { Id: `text`, LabelName: "Text Field", Type: "text", Name: "text", icon: "text_fields", },
    { Id: `email`, LabelName: "Email", Type: "email", Name: "email", icon: "alternate_email" },
    { Id: `number`, LabelName: "Number", Type: "number", Name: "number", icon: "pin" },
    { Id: `textarea`, LabelName: "Textarea", Type: "textarea", Name: "textarea", icon: "short_text" },
    { Id: `radio`, LabelName: "Radios", Type: "radio", Name: "radio", icon: "radio_button_checked" },
    { Id: `checkbox`, LabelName: "Checkboxes", Type: "checkbox", Name: "checkbox", icon: "select_check_box" },
    { Id: `Dropbox`, LabelName: "DropDown", Type: "select", Name: "select", icon: "dropdown", Options: ["Value1", "Value2"] },

];

// Sidebar toolbox component
const SidebarToolbox = ({ addField, isSidebarOpen, toggleSidebar }) => {
    return (
        <div className={`bg-slate-50 border-r border-slate-200 shadow-lg h-full transition-all duration-300 ease-in-out overflow-auto ${isSidebarOpen ? 'w-72' : 'w-16'}`}>
            {/* Toolbox header */}
            <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-gradient-to-r from-purple-600 to-indigo-600">
                <h3 className={`font-semibold text-white text-lg ${isSidebarOpen ? 'block' : 'hidden'}`}>Form Builder</h3>
                <button
                    onClick={toggleSidebar}
                    className="text-white hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 focus:ring-offset-violet-600 rounded-full p-1 transition-all duration-200"

                >
                    {isSidebarOpen ? (
                        <span className="material-symbols-outlined">
                            chevron_left
                        </span>
                    ) : (
                        <span className="material-symbols-outlined">
                            chevron_right
                        </span>
                    )}
                </button>
            </div>

            {/* Toolbox content */}
            <div className="p-4 space-y-3">
                {isSidebarOpen ? (
                    toolboxFields.map((tool) => (
                        <button
                            key={tool.Id}
                            className="w-full p-3 bg-white border-slate-100 rounded-lg shadow hover:shadow-md hover:bg-violet-50 active:bg-violet-100 transition-all duration-200 text-left flex items-center border border-transparent hover:border-violet-200 group"
                            onClick={() => addField(tool)}
                            title={tool.LabelName}
                        >
                            <div className="flex items-center space-x-3 w-full">
                                <span className="material-symbols-outlined text-violet-600 bg-violet-100 p-2 rounded-md group-hover:bg-violet-200 transition-colors">
                                    {tool.icon}
                                </span>
                                <span className="text-slate-700 font-medium">{tool.LabelName}</span>
                            </div>
                        </button>
                    ))
                ) : (
                    toolboxFields.map((tool) => (
                        <button
                            key={tool.Id}
                            className="w-full p-2 bg-white rounded-lg shadow hover:shadow-md hover:bg-violet-50 active:bg-violet-100 transition-all duration-200 flex justify-center items-center border border-transparent hover:border-violet-200 group"
                            onClick={() => addField(tool)}
                            title={tool.LabelName}
                        >
                            <span className="material-symbols-outlined text-purple-600 p-1 rounded-md group-hover:bg-violet-100 transition-colors">
                                {tool.icon}
                            </span>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};
const EditForm = () => {
    const navigate = useNavigate();
    const fieldArray = useSelector(s => s.Field.value);
    const [fields, setFields] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const dispatch = useDispatch();
    const updater = useDebounce((updatedFields) => {
        dispatch(changeFieldValue(updatedFields));
    }, 10)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const editHandle = (fieldId) => {
        dispatch(removeSpecificField(fieldId));
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedFields = [...fields];
        const [movedItem] = reorderedFields.splice(result.source.index, 1);
        reorderedFields.splice(result.destination.index, 0, movedItem);
        setFields(reorderedFields);
        //this is not working  tomorrow solve this


    };

    const addField = (field) => {
        const obj = { ...field, };
        obj.key = `${obj.Id}_${fieldArray.length}`
        console.log(obj)
        setFields([{ ...obj, }, ...fields]);
        dispatch(addSpecificField(obj));
    };
    useEffect(() => {
        setFields(fieldArray);
    }, [fieldArray]);

    return (
        <>
            <div className="flex h-screen overflow-hidden bg-slate-100 relative ">
                <button className="absolute right-5 top-4 shadow-lg shadow-purple-300  text-xl flex items-center justify-center bg-violet-500 text-white p-2 z-20" title="live preview" onClick={() => {
                    navigate("/preview")
                    updater(fields)
                }}><span class="material-symbols-outlined text-white">
                        preview
                    </span> </button>
                {/* Mobile sidebar toggle button for small screens */}
                <div className="fixed top-4 left-4 lg:hidden z-50">
                    <button
                        onClick={toggleSidebar}
                        className="bg-violet-600 text-white p-2 rounded-lg shadow-md hover:bg-violet-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                        aria-label="Toggle sidebar"
                    >
                        <span className="material-symbols-outlined">
                            {isSidebarOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>

                {/* Sidebar overlay for mobile */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden backdrop-blur-sm transition-all duration-300"
                        onClick={toggleSidebar}
                        aria-hidden="true"
                    ></div>
                )}

                {/* Sidebar */}
                <div className={`fixed lg:static h-full z-40 lg:z-0 transition-all duration-300 ${isSidebarOpen ? 'left-0' : '-left-72'}`}>
                    <SidebarToolbox
                        addField={addField}
                        isSidebarOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                    />
                </div>

                {/* Main content */}
                <div className={`flex-1 overflow-auto p-4 lg:p-6 transition-all duration-300`}>
                    <div className="bg-white shadow-xl rounded-2xl p-5 md:p-6 max-w-4xl mx-auto mt-8 lg:mt-4 border border-slate-200">
                        <h2 className="text-xl md:text-2xl font-bold mb-6 text-slate-800 pb-3 border-b border-slate-100 flex items-center">
                            <span className="material-symbols-outlined mr-2 text-violet-600">
                                dashboard_customize
                            </span>
                            Form Field Editor
                        </h2>

                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="form-fields">
                                {(provided) => (
                                    <form
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="space-y-4"
                                    >
                                        {fields.map((field, index) => (
                                            <Draggable key={field.key} draggableId={field.key} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`p-4 md:p-5  border border-x-slate-300 rounded-xl bg-slate-100 flex flex-col md:flex-row items-start md:items-
                                                        center space-y-2 md:space-y-0 md:space-x-3 transition-all duration-200 hover:border-violet-300 ${snapshot.isDragging ? 'shadow-lg ring-2 ring-violet-200 rotate-1' : 'hover:shadow-md'}`}
                                                    >
                                                        <EditBox
                                                            key={field.key}
                                                            index={index}
                                                            field={field}
                                                            editHandle={() => editHandle(field.Id)}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                        {fields.length === 0 && (
                                            <div className="text-center py-16 text-slate-500 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                                                <span className="material-symbols-outlined text-5xl text-slate-400 mb-3">
                                                    drag_pan
                                                </span>
                                                <p className="text-lg font-medium mb-2">Your form is empty</p>
                                                <p className="text-sm text-slate-500 max-w-md">
                                                    Put  fields here
                                                </p>
                                            </div>
                                        )}
                                    </form>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditForm;