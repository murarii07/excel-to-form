import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react'
import InputField from './inputField';

function ValueList({ isOpen, openHandle, values,handleOptions }) {
  const [valueArray, setValueArray] = useState([]);
  const [value, setValue] = useState("");
  
  const addValue = () => {
    if (!value.trim()) return;
    setValueArray((prev) => [...prev, value.trim()]);
    setValue("");
  };
  
  const deleteValue = (val) => {
    if (!val) return;
    setValueArray((prev) => prev.filter(x => x !== val));
  };
  
  const close = () => {
    openHandle(false);
  };
  
  useEffect(() => {
    console.log("Dialog state changed:", isOpen);
  }, [isOpen]);
  
  useEffect(() => {
    setValueArray(values);
  }, [values]);
  
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 w-screen bg-black/60 backdrop-blur-sm transition-opacity" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          className="w-full max-w-md rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-2xl border border-slate-700/50 transition-all duration-300 ease-out"
        >
          <DialogTitle as="h3" className="text-xl font-bold text-white mb-4">
            Manage Values
          </DialogTitle>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="valueInput" className="block text-sm font-medium text-slate-300">
                Add new value
              </label>
              <div className="flex items-center gap-2">
                <InputField
                  id="valueInput"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="flex-1 bg-slate-700/50 text-white rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-400 focus:border-transparent p-2"
                  placeholder="Enter a value"
                />
                <button 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-70 disabled:cursor-not-allowed"
                  onClick={addValue}
                >
                  Add
                </button>
              </div>
            </div>
            
            {/* Values List */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-300 mb-2">Current values</p>
              <div className="max-h-60 overflow-y-auto rounded-lg border border-slate-700 bg-slate-800/50 divide-y divide-slate-700/80">
                {valueArray.length === 0 ? (
                  <div className="py-4 px-3 text-slate-400 text-center italic">
                    No values added yet
                  </div>
                ) : (
                  valueArray.map((x, index) => (
                    <div 
                      className="py-2 px-3 flex items-center justify-between group hover:bg-slate-700/50 transition-colors duration-150" 
                      key={`${x}-${index}`}
                    >
                      <span className="text-slate-200 truncate">{x}</span>
                      <button 
                        className=" bg-transparent p-1 rounded-md hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors duration-150 material-symbols-outlined"
                        onClick={() => deleteValue(x)}
                      >
                   close
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400"
              onClick={close}
            >
              Cancel
            </button>
            <button
              className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onClick={() => {
                handleOptions(valueArray)
                close();
              }}
            >
              Apply
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default ValueList;