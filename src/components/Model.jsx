import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Model = ({ onClose, children, ActionBar }) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-500 opacity-80"
      ></div>
      <div className="fixed inset-40 inset-x-40 inset-y-20 p-10 bg-slate-950">
        <div className="flex flex-col justify-between gap-2 h-full">
          {children}

          <div className="flex justify-end">{ActionBar}</div>
        </div>
      </div>
    </div>,
    document.querySelector('.model-container')
  );
};

export default Model;
