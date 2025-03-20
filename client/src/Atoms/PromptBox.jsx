import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react'
import InputField from './inputField';
import Label from './Label';

export default function PromptBox({ isOpen, message, setDialog, setFormDetails }) {
  useEffect(() => {
    console.log("Dialog state changed:", isOpen);
  }, [isOpen]);

  function close() {
    setDialog({ flag: false, message });
  }
  const [value, setValue] = useState({ formName: "", title: "", description: "" })
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      {/* Background overlay */}
      <div className="fixed inset-0  w-screen bg-black/50 backdrop-blur-sm " />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          className="w-full max-w-md rounded-xl bg-neutral-800 p-6  shadow-xl transition-all duration-300 ease-out"
        >
          <DialogTitle as="h3" className="text-lg font-semibold text-white">
            Confirm Action
          </DialogTitle>

          {/* Styled Input Field */}
          <Label className="mt-2 text-sm text-white/50" htmlFor={"name"} labelname="Enter Form Name" />
          <InputField
            value={value.formName}
            type="text"
            placeholder="Enter value..."
            className="mb-3 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-[#8A2BE2] focus:outline-none focus:ring-1 focus:ring-[#8A2BE2]"
            onChange={(e) => setValue(
              (pre) => {
                return (
                  { ...pre, formName: e.target.value }
                )
              })}
          />
          <Label className="mt-2 text-sm text-white/50" htmlFor={"title"} labelname="Enter Form Title" />
          <InputField
            value={value.title}
            type="text"
            placeholder="Enter value..."
            className="mb-4 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-[#8A2BE2] focus:outline-none focus:ring-1 focus:ring-[#8A2BE2]"
            onChange={(e) => setValue(
              (pre) => {
                return (
                  { ...pre, title: e.target.value }
                )
              })}
          />
          <Label className="mt-2 text-sm text-white/50" htmlFor={"des"} labelname="Enter Form Descriptiom" />
          <InputField
            value={value.description}
            type="textarea"
            placeholder="Enter value.. (short description)."
            className="mb-4 w-full h-24 rounded-md border border-gray-700 bg-gray-800 px-3 py-21 text-white placeholder-gray-400 focus:border-[#8A2BE2] focus:outline-none focus:ring-1 focus:ring-[#8A2BE2]"
            onChange={(e) => setValue(
              (pre) => {
                return (
                  { ...pre, description: e.target.value }
                )
              })}
          />

          {/* Action Buttons */}
          <div className="mt-4 flex justify-end gap-3">
            <Button
              className="rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-red-600 focus:ring-1 focus:ring-white"
              onClick={close}
            >
              Cancel
            </Button>
            <Button
              className="rounded-md bg-[#8A2BE2] px-4 py-2 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-green-500 focus:ring-1 focus:ring-white"
              onClick={() => {
                if (value.formName && value.title) {
                  setFormDetails(value)
                  close()
                  return;
                }
                alert("please enter form details");
              }}
            >
              OK
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
