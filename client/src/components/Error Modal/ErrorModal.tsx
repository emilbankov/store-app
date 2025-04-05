import React from 'react';
import './ErrorModal.css'; // Import your CSS for styling

interface ErrorModalProps {
    message: string;
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
    return (
        <div className="error-modal-overlay" onClick={onClose}>
            <div className="error-modal" onClick={(e) => e.stopPropagation()}>
                <h2>Възникна грешка</h2>
                <p>{message}</p>
                <button onClick={onClose}>Затвори</button>
            </div>
        </div>
    );
};

export default ErrorModal;
