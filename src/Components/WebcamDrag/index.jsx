import { useState, useEffect, useLayoutEffect } from "react";
import Draggable from "react-draggable";
import { XCOUNTERS } from "../../utils/constants";
import "./style.css";
import { CloseOutlined } from "@ant-design/icons";
import { PictureOutlined, UserOutlined } from "@ant-design/icons";
import ColorPicker from "./ColorPicker";

const WebcamDrag = (props) => {
  // eslint-disable-next-line react/prop-types
  const { cameraDeviceId, isFlipCamera, recordingStarted } = props;
  const [btn, setBtn] = useState(1)
  const [hex, setHex] = useState("#a3d8e7");
  const [selectedStroke, setSelectedStroke] = useState(1);
  const [avatarStroke, setAvatarStroke] = useState(2);
  const [avatarShape, setAvatarShape] = useState(1);
  const [radius, setRadius] = useState("55px");
  const [sizeWebcamDrag, setSizeWebcamDrag] = useState({
    id: 1,
    title: "1.0",
    height: "200px",
    width: "200px",
  }); // Webcam Drag default size : 200 px
  const [active, setActive] = useState(true);
  const [currentCounterIndex, setCurrentCounterIndex] = useState(0);
  // console.log("isFlipCamera>>", isFlipCamera)
  useLayoutEffect(() => {
    if (recordingStarted) {
      console.log("recordingStarted")
      setActive(false)
    } else
      setActive(true)
  }, [recordingStarted])
  const handleZoomChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentCounterIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % XCOUNTERS.length;
      setSizeWebcamDrag({
        id: XCOUNTERS[nextIndex].id,
        title: XCOUNTERS[nextIndex].title,
        height: XCOUNTERS[nextIndex].height,
        width: XCOUNTERS[nextIndex].width,
      });
      return nextIndex;
    });
  };

  const avatarShapeBtn = [
    {
      id: 1,
      shape: "Capsul",
      style: {
        border: "1px solid #fff",
        borderRadius: "10px",
        color: "#8c8c8c",
      },
      borderRadius: "55px",
    },
    {
      id: 2,
      shape: "Oval",
      style: {
        border: "1px solid #fff",
        borderRadius: "28px",
        color: "#8c8c8c",
        height: "24px",
        width: "24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      borderRadius: "50%",
    },
    {
      id: 3,
      shape: "Square",
      style: {
        border: "1px solid #fff",
        borderRadius: "2px",
        color: "#8c8c8c",
        height: "24px",
        width: "24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      borderRadius: "10px",
    },
    {
      id: 4,
      shape: "Rectangle",
      style: {
        border: "1px solid #fff",
        borderRadius: "2px",
        color: "#8c8c8c",
        height: "16px",
        width: "24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      borderRadius: "10px",
    },
  ];
  const avatarStrokeBtn = [
    { id: 1, border: "1px", borderWidth: "0px" },
    { id: 2, border: "1px", borderWidth: "1px" },
    { id: 3, border: "2px", borderWidth: "2px" },
    { id: 4, border: "3px", borderWidth: "4px" },
  ];
  const strokeBtn = [
    { id: 1, borderStyle: "solid" },
    { id: 2, borderStyle: "dotted" },
  ];
  function calculateColor(hex, offset) {
    // Convert hex to RGB
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);

    // Add offset to each RGB component
    const newR = Math.min(255, Math.max(0, r + offset));
    const newG = Math.min(255, Math.max(0, g + offset));
    const newB = Math.min(255, Math.max(0, b + offset));

    // Convert back to hex
    const newHex = `#${(newR * 65536 + newG * 256 + newB)
      .toString(16)
      .padStart(6, "0")}`;

    return newHex;
  }

  const handleCameraSource = async () => {
    try {
      const constraints = {
        audio: false,
        video: {
          deviceId: cameraDeviceId ? cameraDeviceId?.value : undefined,
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const videoElement = document.querySelector("video#webcam_video");
      if (stream && videoElement) videoElement.srcObject = stream;
    } catch (error) {
      console.log("Error opening video camera.", error);
    }
  };
  useEffect(() => {
    handleCameraSource();
  }, [cameraDeviceId, btn]);

  return (
    <div className="rounded-full" style={{ zIndex: '500', width: '100vw', height: '100vh' }}>
      <Draggable bounds='parent'>


        <div className="container_web_ver">
          <div
            style={{ borderRadius: `${!active ? radius : ""}` }}
            className={`${!active ? "" : "wd_draggable"}`}
          >
            <div className="wrapper">
              <div className="btn-wrapper">
                <div
                  className={`button-1 ${!active ? "d-none" : ""} ${btn === 1 ? "active" : "non-active"
                    }`}
                  onClick={() => setBtn(1)}
                >
                  <div
                    className={`user-outlined-1 ${btn === 1
                      ? "active-btn activeBorder"
                      : "non-active-btn nonActiveBorder"
                      } `}
                  >
                    <UserOutlined style={{ width: "14px" }} />
                  </div>
                </div>
                <div
                  className={`button-2 ${!active ? "d-none" : ""} ${btn === 2 ? "active" : "non-active"
                    }`}
                  onClick={() => setBtn(2)}
                >
                  <div
                    className={`user-outlined-2 ${btn === 2 ? "active-btn" : "non-active-btn"
                      } `}
                  >
                    <PictureOutlined
                      style={{ width: "24px", height: "24px" }}
                    />
                  </div>
                </div>
              </div>
              <div className={`camra_text ${!active ? "d-none" : ""}`}>
                {btn === 1 ? "Camera" : "Profile Picture"}
              </div>
            </div>
            <div className="Webcam-avatar" onDoubleClick={(e) => {
              e.stopPropagation(); e.preventDefault(); setActive(!active);
            }}>

              {btn == 1 && <video
                id="webcam_video"
                autoPlay

                style={{
                  transform: isFlipCamera === true ? 'scaleX(-1)' : 'none',
                  width: `${avatarShape == 1 ? `calc(${sizeWebcamDrag.width} - ${parseInt(sizeWebcamDrag.width) * 0.3}px)` : sizeWebcamDrag.width}`,
                  height: `${avatarShape == 4 ? `calc(${sizeWebcamDrag.height} - ${parseInt(sizeWebcamDrag.height) * 0.3}px)` : sizeWebcamDrag.height}`,
                  borderRadius: radius,
                  objectFit: 'cover',
                  border: `${avatarStrokeBtn.find((i) => i.id == avatarStroke)?.borderWidth} ${strokeBtn.find((item) => item.id === selectedStroke)?.borderStyle || 'solid'} ${calculateColor(hex, 50)}`,
                }}
              />}
              {btn == 2 &&
                <div>
                  <img
                    style={{
                      width: `${avatarShape == 1
                        ? `calc(${sizeWebcamDrag.width} - ${parseInt(sizeWebcamDrag.width) * 0.3
                        }px)`
                        : sizeWebcamDrag.width
                        }`,
                      height: `${avatarShape == 4
                        ? `calc(${sizeWebcamDrag.height} - ${parseInt(sizeWebcamDrag.height) * 0.3
                        }px)`
                        : sizeWebcamDrag.height
                        }`,
                      borderRadius: radius,
                      objectFit: "cover",
                      border: `${avatarStrokeBtn.find((i) => i.id == avatarStroke)
                        ?.borderWidth
                        } ${strokeBtn.find((item) => item.id === selectedStroke)
                          ?.borderStyle || "solid"
                        } ${calculateColor(hex, 50)}`,
                      webkitUserDrag: "none",
                      webkitUserSelect: "none",
                    }}
                    className="card-img"
                    src={
                      "https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg"
                    }
                  />
                </div>
              }
              <div className="wd_zoom_btn">
                <div
                  className={`wd_zoom_each_btn ${!active ? "d-none" : ""}`}
                  type="primary"
                  shape="circle"
                  onClick={handleZoomChange}
                >
                  x{XCOUNTERS[currentCounterIndex].title}
                </div>
              </div>
            </div>
            <div className={`avatar-shape ${!active ? "d-none" : ""}`}>
              {avatarShapeBtn.map((i, index) => (
                <div
                  key={index}
                  style={i.style}
                  className={`avatar-outlined ${i.id == avatarShape ? "active" : "non-active"
                    }`}
                  onClick={() => {
                    setAvatarShape(i.id);
                    setRadius(i.borderRadius);
                  }}
                >
                  <UserOutlined
                    style={{ width: "14px" }}
                    className={`${i.id == avatarShape ? "active-btn" : "non-active-btn"
                      }`}
                  />
                </div>
              ))}
            </div>
            <div className={`avatar-stroke ${!active ? "d-none" : ""}`}>
              {avatarStrokeBtn.map((item) => (
                <div
                  className={`avatar-wrapper ${avatarStroke === item.id ? "active" : "non-active"
                    }`}
                  key={String(item.id)}
                  onClick={() => setAvatarStroke(item.id)}
                >
                  <div
                    className="avatar"
                    style={{
                      borderBottom: `${item.border} solid ${avatarStroke === item.id ? "#fff" : "#0f0f0f"
                        }`,
                      width: `20px`,
                      position: "relative",
                    }}
                  >
                    {item.id === 1 && (
                      <CloseOutlined
                        className="cross-btn"
                        style={{
                          position: "absolute",
                          color: "#c80b0b",
                          top: "0px",
                          left: "4px",
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className={`${!active ? "d-none" : ""}`}>
              {avatarStroke !== 1 && (
                <div
                  className={`stroke ${selectedStroke == null ? "hidden" : ""}`}
                >
                  <div className="stroke-style">
                    {strokeBtn.map((item) => (
                      <div
                        className={`stroke-wrapper ${selectedStroke == item.id ? "active" : "non-active"
                          }`}
                        key={String(item.id)}
                        onClick={() => setSelectedStroke(item.id)}
                      >
                        <div
                          className={`stroke ${selectedStroke == item.id
                            ? "active-btn"
                            : "non-active-btn"
                            }`}
                          style={{
                            borderBottom: `2px ${item.borderStyle} ${selectedStroke == item.id ? "#fff" : "black"
                              }`,
                            width: `20px`,
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="horizontal-line">|</div>
                  <div>
                    <ColorPicker hex={hex} setHex={setHex} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default WebcamDrag;
