import React, { useRef, useState, useEffect } from 'react';
import './input.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const toastify = (txt) => {
  toast.success(`${txt} updated`, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1500,
    theme: 'dark'
  });
};

export const InputModal = () => {
//api calss


const abortControllerRef = useRef(null); 
  const modalRef = useRef(null); // Reference to the modal element
  const [showModal, setShowModal] = useState(false);

  // Handle clicks outside the modal
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
      abortControllerRef.current.abort();
    }
  };

  // Handle "Escape" key press
  const handleKeyPress = (event) => {
    if (event.keyCode === 27) {
      setShowModal(false);
    }
    
  };

  // Add a click event listener on mount
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // Function to show the modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (showModal) {
      modalRef.current.focus();


      const abortController = new AbortController();
      abortControllerRef.current = abortController;
      const handleAPIGET = async (query) => {
        // if (event.ctrlKey && event.key === 'Enter') {
        // Encode the query before sending it in the URL
        // const encodedQuery = encodeURIComponent(modalRef.current.value);
        try {
          await fetch(`http://localhost:3000/search/:${encodeURIComponent(query)}`, {
            signal: abortController.signal,
          })
            .then((response) => {
              console.log('res in his way back');
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              // Handle the response as needed
              console.log('Response:', data);
            });
      
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch request was aborted by the user.');
          toastify('Requet Aborted')
        } else {
          console.error('An error occurred:', error.message);
        }
      }
    }



      const textareaElement = modalRef.current;

      // Add keydown event listener to the textarea
      const handleKeyDown = (event) => {
        // Check for Ctrl + Enter key press (event.ctrlKey is for Windows/Linux, event.metaKey is for macOS)
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
          handleAPIGET(textareaElement.value);
        }
      };

      textareaElement.addEventListener('keydown', handleKeyDown);

      return () => {
        // Remove the keydown event listener when the component is unmounted
        textareaElement.removeEventListener('keydown', handleKeyDown);
      };
    }
    else {
      // If the modal is not shown, cancel the request by aborting the controller
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    }
    return () => {
      // Cleanup function
      // If the component unmounts or the dependency array changes, abort the request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [showModal]);
 
  
  return (

    <div className='Input-modal'>
      {/* triggering the typing-modal */}
      <button onClick={handleShowModal}
        // hx-get="/search/:react"
        // hx-trigger="click"
      >Start Typing</button> 
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <textarea type="text" ref={modalRef} placeholder="start writing" />
          </div>
        </div>
      )}
    </div>
  );
};

