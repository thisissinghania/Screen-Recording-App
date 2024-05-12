import React, { useState } from "react";
import { Button, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./styles.css";
import Gif from "../../../src/assets/cinema.gif";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isExtInstalled, setIsExtInstalled] = useState(false);


  const handleModalClick = () => {
    const EXTENSION_ID = "mddlejaeahmdcdipndndelchoanfhpdl";
    
    // Check if chrome.runtime.sendMessage is available
    if (chrome.runtime && chrome.runtime.sendMessage) {
      try {
        chrome.runtime.sendMessage(EXTENSION_ID, "version", {}, (response) => {
          if (!response) {
            console.log("No extension");
            navigate("/record");
            return;
          } else if (response?.version) {
            setIsExtInstalled(true);
            setIsOpen(true);
          }
        });
      } catch (error) {
        // Handle the error case
        console.error("Error sending message to extension:", error);
        navigate("/record");
      }
    } else {
      // Handle the case where chrome.runtime.sendMessage is not available
      console.log("chrome.runtime.sendMessage is not available. Extension might not be installed.");
      navigate("/record");
    }
  };
  
  
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="main-container">
        <Button
          onClick={handleModalClick}
          size="large"
          type="primary"
          className="main-container-btn"
        >
          <SearchOutlined />
          <span>Start Screen Recording</span>
        </Button>
      </div>
      <Modal open={isOpen} footer={null} onCancel={onClose}>
        {isExtInstalled && (
          <>
            <div className="modal-header-txt">
              We're delighted to see that you have the Cinema8 extension
              installed! You're all set to enjoy seamless access to our
              platform.
            </div>
            <div>
              <img className="modal-gif" src={Gif} alt="" />
            </div>
          </>
        )}
        <div className="footer-btn">
          <Button type="primary" onClick={() => navigate("/record")}>
            Continue with web version
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Home;
