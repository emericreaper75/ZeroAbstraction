"use client";

import { Modal } from "@/components/ui/modal";

interface ProjectDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  demoUrl: string;
}

export function ProjectDemoModal({ isOpen, onClose, title, demoUrl }: ProjectDemoModalProps) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`${title} - Live Demo`}
      className="max-w-4xl h-[80vh] flex flex-col"
    >
      <div className="flex-1 w-full rounded-md border border-zinc-800 overflow-hidden bg-black mt-2">
        {isOpen && (
          <iframe 
            src={demoUrl} 
            className="w-full h-full border-0"
            title={`${title} Interactive Demo`}
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          />
        )}
      </div>
      <div className="mt-4 flex items-center justify-between text-zinc-500 text-xs font-mono">
        <p>Running WebAssembly client-side. Performance depends on your device.</p>
        <p>Press Esc to close</p>
      </div>
    </Modal>
  );
}
