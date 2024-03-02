import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from './Button';
import { IconSelector } from '../utils/selector';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  title?: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, children, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg relative overflow-auto max-h-96 max-w-lg md:min-w-[500px]">
          <div className='flex justify-between items-center sticky top-0 right-0 bg-white px-4 py-2'>
            <div className='text-2xl font-medium'>{title}</div>
            <Button onClick={onClose} size={'icon'} variant={'ghost'}><IconSelector.menuIcon.close/></Button>
          </div> 
          <div className="p-4">
            {children}
          </div>
        </div>
    </div>,
    document.body
  );
};

export default Modal;