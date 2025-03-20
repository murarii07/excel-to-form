import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useEffect, useState } from 'react';

export default function DialogBox({ isOpen, message, setDialog }) {
  useEffect(() => {
    console.log("Dialog state changed:", isOpen ? "open" : "closed");
  }, [isOpen]);

  function close() {
    setDialog({ flag: false, message });
  }

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10"
        onClose={close}
      >
        {/* Backdrop */}
        <div className="fixed inset-0 z-10 w-screen bg-black/30 backdrop-blur-sm" aria-hidden="true" />

        {/* Dialog positioning */}
        <div className="fixed inset-0 z-20 flex items-center justify-center p-4">
          <DialogPanel
            className="w-full max-w-md rounded-xl bg-[#3A0CA3] p-6 text-white shadow-xl shadow-purple-800/50 transition-all duration-300 ease-out data-[closed]:opacity-0 data-[closed]:scale-95"
          >
            <DialogTitle as="h3" className="text-lg font-semibold text-white text-center">
              Notification
            </DialogTitle>

            <p className="mt-2 text-xl text-center text-white">
              {message}
            </p>

            <div className="mt-4 flex items-center justify-center gap-2">
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-[#8A2BE2] py-2 px-4 text-sm font-semibold text-white shadow-inner shadow-white/10 transition-all duration-200 hover:bg-[#6F1BBF] focus:outline-none focus:ring-2 focus:ring-white/50"
                onClick={close}
              >
                OK
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}