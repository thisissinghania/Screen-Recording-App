import { useState, useEffect, useLayoutEffect } from "react";
import { BsCameraVideoOff } from "react-icons/bs";

import "./style.css";
import {
  AudioMutedOutlined,
  AudioOutlined,
  CheckOutlined,
  DesktopOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const LabelSelect = (props) => {
  const { label, options, allowed, value, onChangeDeviceSource } = props;
  console.log("valuefirst>>", value);
  const [status, setStatus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const filteredArray = options.filter(
    (item) => item.label !== "" && item.value !== ""
  );

  useEffect(() => {
    if (value !== undefined) {
      if (value == "No Microphone") {
        setStatus(false);
        setSelectedOption({ label: "No Microphone", value: "No Microphone" });
      } else if (value == "No Camera") {
        setStatus(false);
        setSelectedOption({ label: "No Camera", value: "No Camera" });
      } else {
        if (label == "Microphone" && value?.label != "No Microphone") {
          setStatus(true);
        } else if (label == "Camera" && value?.label != "No Camera") {
          setStatus(true);
        } else {
          setStatus(false);
        }
        setSelectedOption(value);
      }
    }
  }, [value]);
  const handleSelect = (option) => {
    setSelectedOption(option);
    if (label && label === "Camera" && option?.label != "No Camera") {
      setStatus(true);
    } else if (
      label &&
      label === "Microphone" &&
      option?.label != "No Microphone"
    ) {
      setStatus(true);
    } else {
      setStatus(false);
    }
    setIsOpen(false);
    onChangeDeviceSource(option);
  };
  return (
    <>
      <div
        className={isOpen ? "custom-dropdown open-dropdown" : "custom-dropdown"}
      // onMouseEnter={() => setIsOpen(true)}
      // onMouseLeave={() => setIsOpen(false)}
      >
        {/* <span className={`status ${selectedOption.value == 'Disabled' ? 'deactive-text' : 'active-text'}`}>{selectedOption.value == 'Disabled' ? 'Off' : 'On'}</span> */}
        <span className={`status ${status ? "active-text" : "deactive-text"}`}>
          {status ? "On" : "Off"}
        </span>
        <div
          className={isOpen ? "selected-option open-select-option" : "selected-option"}
          onClick={() => filteredArray && setIsOpen(!isOpen)}
        >
          {label && label === "Microphone" ? (
            selectedOption?.label === "No Microphone" ? (
              <AudioMutedOutlined className="mic" />
            ) : (
              <AudioOutlined className="mic" />
            )
          ) : label && label === "Camera" ? (
            selectedOption?.label === "No Camera" ? (
              <>
                <span><BsCameraVideoOff className="mic no-camera svg_change" /></span>
              </>
            ) : (
              <DesktopOutlined className="mic" />
            )
          ) : (
            <DesktopOutlined className="mic" />
          )}
          <span className="ellipsetext">
            {" "}
            {selectedOption ? selectedOption?.label : "Select an option"}
          </span>
        </div>
        {isOpen && (
          <div className="options">
            {filteredArray &&
              filteredArray?.map((option, index) => (
                <div className="options-inside" key={index}>
                  <p
                    className={
                      selectedOption.label === option.label
                        ? "option-text selected-option-text"
                        : "option-text"
                    }
                    key={index}
                    onClick={() => handleSelect(option)}
                  >
                    {label === "Microphone" &&
                      option.label === "No Microphone" ? (
                      <AudioMutedOutlined className="mic" />
                    ) : label && label === "Camera" ? (
                      selectedOption?.label === "No Camera" ? (
                        <DesktopOutlined className="mic" />
                      ) : (
                        <DesktopOutlined className="mic" />
                      )
                    ) : (
                      <AudioMutedOutlined className="wd_ext_mic" />
                    )}
                    <span className="ellipsetext">{option.label}</span>
                    <span className="checkTag">
                      {<CheckOutlined className="check" />}
                    </span>
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* {allowed ? (
         <span  className="status">{CAMERA_ALLOWED_MESSAGE}</span>
       
      ) : (
         <span  className="status">{CAMERA_BLOCKED_MESSAGE}</span>
      
      )} */}
    </>
  );
};

export default LabelSelect;
