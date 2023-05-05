/*As mentioned in Task is  "Create a button that once clicked creates a phone 
    verification popup with the option to enter 6 digits in different inputs as an OTP."
    So I just created "Varify Phone Button" & "Clear button " but I also Created "Resend or Change the number button"
    but I not add functanlity to "Resend" here in this code It just look as given in Task image  */



import React, { useState, useRef, useEffect } from 'react';
import {Box, Button} from "@mui/material";


function PhoneVerificationPopup() {
    
  const [showPopup, setShowPopup] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    
    if (showPopup) {
      inputRefs.current[0].focus();
    }
  }, [showPopup]);

  const handleInputChange = (index, event) => {
    const value = event.target.value;
    if (!/^[0-9]*$/.test(value)) {
      return;
    }
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });
    if (index < 5 && value) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (event.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1].focus();
    } else if (event.key === 'Backspace' && !otp[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData.getData('Text');
    const otpArray = Array.from(clipboardData).slice(0, 6);
    setOtp(otpArray.concat(Array(6 - otpArray.length).fill('')));
  };

  const handleVerifyClick = () => {
    setShowPopup(true);
  };
  
  const handlePopupClose = () => {
    
    setShowPopup(false);
  };

 

  const handleOtpSubmit = () => {
    const enteredOtp = otp.join('');
    alert("Entered OTP is " + otp.join(""))
   
    console.log('Entered OTP:', enteredOtp);
    setOtp(['', '', '', '', '', '']);
    setShowPopup(false);
  };

  return (
    <div>
      <Button sx={{ m: 4 }}variant="contained" onClick={handleVerifyClick}>Verify Phone</Button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            
            <p>Please enter the 6-digit OTP sent to your phone number: +91 ********00</p>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(event) => handleInputChange(index, event)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  onPaste={handlePaste}
                />
               
              ))}
            </div>
            <Box>
            <Button sx={{ m: 4 }} variant="contained" color="success" onClick={handleOtpSubmit}>Verify Phone Number</Button>
            <Button
            sx={{ m: 4 }}
            variant="outlined" color="error"
            onClick={e => setOtp([...otp.map(v => "")])}
                        >
                            Clear
            </Button>
            <Button sx={{ m: 4 }} variant="outlined">Re Send</Button>
            <Button sx={{ m: 4 }} variant="contained" onClick={handlePopupClose}>Change Number</Button>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhoneVerificationPopup;
