import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react'

export default function ConfirmationBox({ isOpen, message, setDialog, setConfirm }) {
  useEffect(() => {
    console.log("close......")
  }, [isOpen])

  function close() {
    setDialog({ flag: false, message, })
  }

  return (
    <>
      <Dialog open={isOpen} as="div" className="relative z-50 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen bg-black/40 backdrop-blur-sm transition-opacity"></div>
        <div className="fixed inset-0 z-20 flex items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-2xl bg-gradient-to-br from-purple-700 to-indigo-900 p-6 text-white shadow-xl shadow-purple-800/50 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-purple-600/30 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <p className="mb-6 text-xl text-center font-medium text-white">
              {message}
            </p>
            
            <div className="mt-6 flex items-center justify-center gap-4">
              <Button
                className="inline-flex items-center justify-center w-full rounded-xl bg-indigo-500 py-3 px-4 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:bg-indigo-600 hover:shadow-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-indigo-700"
                onClick={() => {
                  close()
                  setConfirm(true)
                }}
              >
                Confirm
              </Button>
              <Button
                className="inline-flex items-center justify-center w-full rounded-xl bg-purple-500/20 py-3 px-4 text-sm font-medium text-white border border-purple-400/30 transition-all duration-200 hover:bg-purple-500/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-purple-700"
                onClick={() => {
                  close()
                  setConfirm(false)
                }}
              >
                Cancel
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}