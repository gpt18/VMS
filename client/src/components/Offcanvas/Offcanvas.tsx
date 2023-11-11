// Import React and TypeScript types
import React, { FC, useState } from "react";
import { createPortal } from "react-dom";

// Define a custom Offcanvas component
const Offcanvas: FC<{
    show: boolean; // A prop to control the visibility of the offcanvas
    onHide: () => void; // A prop to handle the close event of the offcanvas
    placement: "start" | "end";
    children: React.ReactNode; // A prop to specify the placement of the offcanvas
}> = ({ show, onHide, placement, children }) => {
    // Use state to toggle the animation of the offcanvas
    const [animate, setAnimate] = useState(false);

    // Define a function to handle the transition end event of the offcanvas
    const handleTransitionEnd = () => {
        if (!show) {
            setAnimate(false);
        }
    };

    // Define a function to handle the click event of the backdrop
    const handleBackdropClick = () => {
        onHide();
    };

    // Render the offcanvas and the backdrop using portal
    return createPortal(
        <>
            {/* Render the backdrop */}
            {show && (
                <div
                    className="modal-backdrop fade show"
                    onClick={handleBackdropClick}
                ></div>
            )}
            {/* Render the offcanvas */}
            <div
                className={`offcanvas offcanvas-${placement} ${animate ? "show" : ""}`} // Apply the placement and animation classes
                style={{ visibility: show ? "visible" : "hidden" }} // Apply the visibility style
                onTransitionEnd={handleTransitionEnd} // Attach the transition end handler
            >
                {children}
            </div>
        </>,
        document.body // Append the portal to the body element
    );
};

// Export the Offcanvas component
export default Offcanvas;
