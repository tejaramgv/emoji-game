// Modal.js
import React, { useState } from 'react';
import './index.css'; // Import your modal styles

const Modal = () => {

    const [open, setOpen] = useState(true);
    const click=()=>{
        setOpen(false)
    }

    return (
        open && (
            <>
                <div className="modal-overlay">
                    <div className="hi">
                        <div className="cross">
                            <button className="close-button" onClick={click}>
                                &times;
                            </button>
                        </div>
                        <h2>Welcome to Laugh Line! 😄</h2>
                        <p className="content">
                            "In each round, you have to click on each emoji only once.
                            If you click on the same emoji twice, you are eliminated. After a round is completed, all
                            the emojis are refreshed, and you can click on each emoji once again. If you click on any emoji
                            twice, you are eliminated. In the first
                            round, you are given 50 seconds, and in the subsequent rounds, you have 30 seconds each"
                        </p>
                    </div>
                </div>
            </>
        )
    );
};

export default Modal;
