import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { LABEL, LOCAL_STORAGE } from "../../utils/constants";
import { alertModal, isEmpty } from "../../utils/functions";
import "./style.css";
import TimeCounterModal from "../../Components/TimeCounterModal";
import LabelSelect from "../../Components/LabelSelect/LabelSelect";
import AnnotationTool from "../../Components/AnnotationTool";

import ScreenAndCamera from "../../assets/ScreenAndCamera.png";
import Screen from "../../assets/DesktopOutlined.png";
import Camera from "../../assets/Camera.png";
import { useGetUserCheckMutation } from "../../API/CheckUser";
import useDataContext from "../../utils/hooks/useDataContext";
import { useUploadVideoMutation } from "../../API/uploadVideo";
import { useDispatch, useSelector } from "react-redux";
import { setId } from "../../API/videoSlice";
import { setMic, setCamera, setRecordingState } from "../../API/selectedDevice";

let mediaRecorder = null,
  stream = null,
  screenStream = null,
  microphoneStream = null,
  recordingStartTime = null,
  recordingEndTime = null;

let cameraDeviceCounter = 0,
  micDeviceCounter = 0;

// Recording mode labels & icons
const modeLabels = [
  {
    label: LABEL.FULL_SCREEN,
    icon: ScreenAndCamera,
  },
  {
    label: LABEL.WINDOW,
    icon: Screen,
  },

  {
    label: LABEL.CAMERA_ONLY,
    icon: Camera,
  },
];

function Record({ activePage }) {
  const navigate = useNavigate();
  const { setIsLogIn, recordingMode, setRecordingMode,
    qualityDefaultValue, setQualityDefaultValue,
    visibleEditMenu, setVisibleEditMenu,
    recordedChunks, setRecordedChunks,
    setFileLoading,
    setVisibleWebcamDrag,
    cameraSource, setCameraSource,
    cameraAllowed, setCameraAllowed,
    microphoneAllowed, setMicrophoneAllowed,
    recordingStarted, setRecordingStarted
  } = useDataContext();
  const [getUserCheck] = useGetUserCheckMutation();
  const [loading, setLoading] = useState(false);
  const [UploadVideoMutation] = useUploadVideoMutation();
  // const [recordingStarted, setRecordingStarted] = useState(false); 
  const [microphoneSource, setMicrophoneSource] = useState("No Microphone"); // Camera source deviceId
  const [visibleTimeCounterModal, setVisibleTimeCounterModal] = useState(false); // Time Counter Modal enable/disable
  const [countNumber, setCountNumber] = useState(4); // Time counter number
  const [microphoneOptions, setMicrophoneOptions] = useState([]); // Microphone source list
  const [cameraOptions, setCameraOptions] = useState([]); // Camera source list
  const [audioDeviceExisting, setAudioDeviceExisting] = useState(false);
  const [videoDeviceExisting, setVideoDeviceExisting] = useState(false);
  const [showCountDown, setShowCountDown] = useState(true);
  const [warning, setWarning] = useState(false);
  const dispatch = useDispatch();
  const quality =
    useSelector((state) => state.setting.quality) ||
    JSON.parse(localStorage.getItem("quality"));
  const isShowCountDown =
    useSelector((state) => state.setting.showCountDown) ||
    JSON.parse(localStorage.getItem("showCountDown"));
  const selectedCamera =
    useSelector((state) => state.device.cameraSelected) ||
    JSON.parse(localStorage.getItem("cameraSelected"));
  const selectedMic =
    useSelector((state) => state.device.micSelected) ||
    JSON.parse(localStorage.getItem("micSelected"));
  const recordingState =
    useSelector((state) => state.device.isRecording) ||
    JSON.parse(localStorage.getItem("isRecording"));

  useEffect(() => {
    if (quality) {
      // console.log("quality>", quality);
      if (quality == "100000") {
        setQualityDefaultValue({
          label: "Low",
          value: "100000",
        });
      } else if (quality == "3000000") {
        setQualityDefaultValue({
          label: "Medium",
          value: "3000000",
        });
      } else if (quality == "5000000") {
        setQualityDefaultValue({
          label: "High",
          value: "5000000",
        });
      } else {
        setQualityDefaultValue({
          label: "Medium",
          value: "3000000",
        });
      }
    }
    setShowCountDown(isShowCountDown);
    if (selectedCamera) {
      console.log("selectedCamera>>", selectedCamera);
      setCameraSource(selectedCamera);
    }
    if (selectedMic) setMicrophoneSource(selectedMic);
    setRecordingStarted(recordingState);
    // if (commentAndReaction) {

    //   setIsReactionOnVideo(commentAndReaction ?? true);
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Get camera & audio device
  useEffect(() => {
    const getDeviceName = async () => {
      await navigator.mediaDevices.enumerateDevices().then(async (devices) => {
        devices.forEach((device) => {
          if (device.kind === "videoinput") {
            cameraDeviceCounter++;
          }
          if (device.kind === "audioinput") {
            micDeviceCounter++;
          }
        });
      });

      if (cameraDeviceCounter !== 0 && micDeviceCounter !== 0) {
        await navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            console.log("You can use Audio and Video device");
          })
          .catch((err) => {
            console.log("You can not use Audio and Video device");
          });
        setVideoDeviceExisting(true);
        setAudioDeviceExisting(true);
      } else {
        if (cameraDeviceCounter !== 0) {
          await navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
              console.log("You can use Video device");
            })
            .catch((err) => {
              console.log("You can not use Video device");
            });
          setVideoDeviceExisting(true);
        }

        if (micDeviceCounter !== 0) {
          await navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
              console.log("You can use Audio device");
            })
            .catch((err) => {
              console.log("You can not use Audio device");
            });
          setAudioDeviceExisting(true);
        }
      }
    };

    getDeviceName();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  let getData = () => {
    setLoading && setLoading(true);
    getUserCheck()
      .then((data) => {
        setLoading && setLoading(false);
        if (data.error) {
          if (data.error?.data?.message == "INVALID_AUTHENTICATION_TOKEN") {
            window.open("https://cinema8.site/signin");
          }
          // throw data.error.message
          // console.log("data.error>>>>>",data.error?.data.message)
          throw Error(data?.error?.data?.message || "Unknown error occurred");
        }
        setIsLogIn(data?.data);
        // setTotalRecord(data?.data.totalRecords)
      })
      .catch((err) => {
        return Error(err);
      });
  };

  useEffect(() => {
    if (videoDeviceExisting) {
      navigator.permissions.query({ name: "camera" }).then((res) => {
        if (res.state == "granted") {
          setCameraAllowed(true);
          onGetDeviceSource();
        } else {
          setCameraAllowed(false);
          setCameraOptions([{ label: "No Camera", value: "No Camera" }]);
        }
      });
    } else {
      setCameraOptions([{ label: "No Camera", value: "No Camera" }]);
    }

    if (audioDeviceExisting) {
      navigator.permissions.query({ name: "microphone" }).then((res) => {
        if (res.state == "granted") {
          setMicrophoneAllowed(true);
          onGetDeviceSource();
        } else {
          setMicrophoneAllowed(false);
          setMicrophoneOptions([
            { label: "No Microphone", value: "No Microphone" },
          ]);
        }
      });
    } else {
      setMicrophoneOptions([
        { label: "No Microphone", value: "No Microphone" },
      ]);
    }
  }, [audioDeviceExisting, videoDeviceExisting]);

  // Time counter
  useEffect(() => {
    let temp = 4;
    function updateCountdown() {
      switch (temp) {
        case 0:
          onCloseModalStartRecording();
          setVisibleEditMenu(true);
          break;
        case 1:
          setRecordingStarted(true);
          dispatch(setRecordingState(true));
          setVisibleTimeCounterModal(false);

        default:
          temp--;
          setCountNumber(temp);
          setTimeout(updateCountdown, 1000);
      }
    }

    if (visibleTimeCounterModal && showCountDown) {
      updateCountdown();
    } else if (!showCountDown) {
      setCountNumber(-1);
      setTimeout(() => {
        onCloseModalStartRecording();
        setVisibleTimeCounterModal(false);
      }, 1000);
    }
  }, [visibleTimeCounterModal, showCountDown]);

  const stopMedia = async () => {
    try {
      if (stream) {
        stream.getTracks().forEach((element) => {
          element.stop();
        });
      }
      if (screenStream) {
        screenStream?.getTracks().forEach((track) => {
          track.stop();
        });
      }
      if (microphoneStream) {
        microphoneStream?.getTracks().forEach((track) => {
          track.stop();
        });
      }

      if (mediaRecorder) mediaRecorder.stop();

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const tracks = mediaStream?.getTracks();

      mediaStream?.getTracks()[0].stop();
      tracks.forEach((track) => track.stop());

      // Wait for the video element to be added to the DOM
      const waitForVideoElement = setInterval(() => {
        const videoElement = document.querySelector("video#webcam_video");
        if (videoElement) {
          clearInterval(waitForVideoElement); // Stop waiting
          videoElement.srcObject = null;
        }
      }, 100);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  // Camera source enable/disable
  useEffect(() => {
    if (cameraAllowed) {
      if (cameraSource === "No Camera" || cameraSource.label === "No Camera") {
        setVisibleWebcamDrag(false);
      } else {
        setVisibleWebcamDrag(true);
      }
    } else {
      setVisibleWebcamDrag(false);
    }
  }, [cameraSource, microphoneSource, cameraAllowed]);

  // Putting chunks during the recording
  useEffect(() => {
    if (mediaRecorder && recordingStarted) {
      mediaRecorder.ondataavailable = (e) => {
        let temp = recordedChunks;
        temp.push(e.data);
        console.log("e.data>>", e.data);
        setRecordedChunks(temp);
      };

      mediaRecorder.start();
    }
  }, [mediaRecorder]);

  useEffect(() => {
    const onEnded = () => {
      onSaveRecording();
      stopMedia();
    };

    if (stream) {
      stream.getVideoTracks()[0].addEventListener("ended", onEnded);
    }

    return () => {
      if (stream) {
        stream.getVideoTracks()[0].removeEventListener("ended", onEnded);
      }
    };
  }, [stream]);

  const checkSelectedDevives = () => {
    if (
      ((recordingMode === 0 || recordingMode === 2) &&
        cameraSource.value === "No Camera") ||
      microphoneSource?.value === "No Microphone"
    ) {
      setWarning(true);
      return false;
    } else {
      setWarning(false);
      return true;
    }
  };
  const onClickRecordingStartOrStop = () => {
    let deviceSelected;
    if (recordingStarted === false) {
      deviceSelected = checkSelectedDevives();
    }
    if (deviceSelected || recordingStarted) {
      console.log("object")
      !recordingStarted ? onStartRecording() : onSaveRecording();
    }
  };

  // Start recording &  Getting the stream and merging the each stream according to recording mode
  const onStartRecording = async () => {
    console.log("cameraSource>>>", cameraSource);
    console.log("microphoneSource>>>", microphoneSource);
    setRecordedChunks([]);
    try {
      if (recordingMode === 2) {
        if (cameraSource.value === "No Camera") {
          alertModal("Please enable your camera(microphone)!");
        } else {
          let onlyCameraStream = await navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: cameraSource ? cameraSource.value : undefined,
            },
            audio: microphoneSource
              ? {
                deviceId: microphoneSource.value,
              }
              : false,
          });

          stream = onlyCameraStream;
          setVisibleTimeCounterModal(true);
        }
      } else {
        const audioContext = new AudioContext();
        let audioIn_01, audioIn_02;
        let dest = audioContext.createMediaStreamDestination();

        screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            displaySurface:
              recordingMode === 0
                ? "monitor"
                : recordingMode === 1
                  ? "window"
                  : "browser",
          },
          audio: true,
        });

        if (screenStream.getAudioTracks()[0]) {
          let screenAudioMediaStream = new MediaStream();
          screenAudioMediaStream.addTrack(screenStream.getAudioTracks()[0]);

          audioIn_01 = audioContext.createMediaStreamSource(
            screenAudioMediaStream
          );
          audioIn_01.connect(dest);
        }

        if (microphoneSource.value !== "No Microphone") {
          microphoneStream = await navigator.mediaDevices.getUserMedia({
            audio: { deviceId: microphoneSource.value },
          });

          if (microphoneStream.getAudioTracks()[0]) {
            let micAudioMediaStream = new MediaStream();
            micAudioMediaStream.addTrack(microphoneStream?.getAudioTracks()[0]);

            audioIn_02 =
              audioContext.createMediaStreamSource(micAudioMediaStream);
            audioIn_02.connect(dest);
          }
        }

        let mergedMediaStream = new MediaStream();
        mergedMediaStream.addTrack(screenStream.getVideoTracks()[0]);
        if (
          screenStream.getAudioTracks()[0] ||
          microphoneSource.value !== "No Microphone"
        ) {
          mergedMediaStream.addTrack(dest.stream.getAudioTracks()[0]);
        }

        stream = mergedMediaStream;

        if (recordingMode !== 2) {
          if (showCountDown) setVisibleTimeCounterModal(true);
          else {
            onCloseModalStartRecording();
            setVisibleEditMenu(true);
            setRecordingStarted(true);
            dispatch(setRecordingState(true));
          }
        } else {
          onCloseModalStartRecording();
          setVisibleEditMenu(true);
          setRecordingStarted(true);
          dispatch(setRecordingState(true));
        }
      }
    } catch (error) {
      console.log("Error accessing the screen: ", error);
    }
  };

  // const handleLogin = () => {
  //   // Redirect user to OAuth provider's login page
  //   window.location.href = 'https://studio.cinema8.site/dashboard';

  //   setTimeout(() => {

  //     if(   window.location.href === 'https://studio.cinema8.site/dashboard'){
  //       const token =   localStorage.getItem("ls.token")

  //       console.log("token>>>",token);
  //     }

  //   }, 5000);
  // };

  // Saving & downloading chunks into file
  const onSaveRecording = async () => {
    stopMedia();
    if (mediaRecorder) {
      setVisibleWebcamDrag(false);
      mediaRecorder.stop();
      mediaRecorder.onstop = async () => {
        const blob = new Blob(recordedChunks, { type: "video/mp4" });
        // Convert blob to file
        const file = new File([blob], { type: "video/mp4" });
        setFileLoading(true);
        UploadVideoMutation({
          file,
          filename: "recording-121.webm",
          sourceType: "SCREEN_RECORD",
        })
          .then((res) => {
            dispatch(setId(res?.data?.id));
            const blob = new Blob(recordedChunks, { type: "video/mp4" });
            const url = URL.createObjectURL(blob);
            recordingEndTime = new Date().getTime();
            localStorage.setItem(LOCAL_STORAGE.BLOB_LINK, url);
            localStorage.setItem(
              LOCAL_STORAGE.RECORDING_DURATION,
              (recordingEndTime - recordingStartTime).toString()
            );
            setFileLoading(false);
            navigate("/editMedia");
          })
          .catch((err) => {
            setFileLoading(false);
            console.log("error:", err);
          });
        stream.getTracks().forEach((element) => {
          element.stop();
        });

        screenStream?.getTracks().forEach((track) => {
          track.stop();
        });

        microphoneStream?.getTracks().forEach((track) => {
          track.stop();
        });
      };
    }

    setRecordingStarted(false);
    dispatch(setRecordingState(false));
    setVisibleEditMenu(false); // Closing edit tools menu
  };

  // Pausing and Resuming
  const onPauseResume = () => {
    if (mediaRecorder.state === "recording") {
      mediaRecorder.pause();
    } else if (mediaRecorder.state === "paused") {
      mediaRecorder.resume();
    }
  };

  // Closing time counter modal & start recording
  const onCloseModalStartRecording = () => {
    recordingStartTime = new Date().getTime();
    mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm;codecs=h264,opus",
      videoBitsPerSecond: Number(qualityDefaultValue),
    });
  };

  // Getting camera & microphone source
  const onGetDeviceSource = async () => {
    let audioDevices = [],
      videoDevices = [];
    await navigator.mediaDevices.enumerateDevices().then(async (devices) => {
      devices.forEach((device) => {
        if (device.kind === "videoinput") {
          cameraDeviceCounter++;
          videoDevices.push(device);
        }

        if (device.kind === "audioinput") {
          micDeviceCounter++;
          audioDevices.push(device);
        }
      });
    });

    if (!isEmpty(videoDevices)) {
      let temp = videoDevices.map((videoDevice) => {
        return { label: videoDevice.label, value: videoDevice.deviceId };
      });

      temp.unshift({ label: "No Camera", value: "No Camera" });
      setCameraOptions(temp);
    } else {
      setCameraOptions([{ label: "No Camera", value: "No Camera" }]);
    }

    if (!isEmpty(audioDevices)) {
      let temp = audioDevices.map((audioDevice) => {
        return { label: audioDevice.label, value: audioDevice.deviceId };
      });
      temp.unshift({ label: "No Microphone", value: "No Microphone" });
      setMicrophoneOptions(temp);
    } else {
      setMicrophoneOptions([
        { label: "No Microphone", value: "No Microphone" },
      ]);
    }
  };

  // Changing camera source
  const onChangeCameraSource = (value) => {
    console.log("value>>", value);
    if (value == "No Camera" || value?.label == "No Camera") {
      setCameraSource({ label: "No Camera", value: "No Camera" });
      dispatch(setCamera({ label: "No Camera", value: "No Camera" }));
    } else {
      setCameraSource(value);
      dispatch(setCamera(value));
    }
  };

  // Changing microphone source
  const onChangeMicrophoneSource = (value) => {
    console.log(">>>>>>>>>>>", value);
    if (value == "No Microphone" || value?.label == "No Microphone") {
      setMicrophoneSource({ label: "No Microphone", value: "No Microphone" });
      dispatch(setMic({ label: "No Microphone", value: "No Microphone" }));
    } else {
      setMicrophoneSource(value);
      dispatch(setMic(value));
    }
  };

  const [activeTab, setActiveTab] = useState("Screen + Camera");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div style={{ display: activePage !== 0 ? 'none' : '' }}>
        <div className="panel-block">
          {/* New Design */}
          <div className="web_container_body">
            <div className="head-title">
              <h3>What would you like to record?</h3>
            </div>
            <div className="all-cinema-buttons">
              <Button.Group value={recordingMode} className="custom-button-group">
                {modeLabels.map((modeLabel, index) => {
                  const isFirstButton = index === 0;
                  const isLastButton = index === modeLabels.length - 1;
                  const buttonStyle = {
                    borderRadius: "0px", // Reset border-radius
                    borderTopLeftRadius: isFirstButton ? "50px" : "0px", // Round top-left corner for first button
                    borderBottomLeftRadius: isFirstButton ? "50px" : "0px", // Round bottom-left corner for first button
                    borderTopRightRadius: isLastButton ? "50px" : "0px", // Round top-right corner for last button
                    borderBottomRightRadius: isLastButton ? "50px" : "0px", // Round bottom-right corner for last button
                    // backgroundColor:
                    //   activeTab === modeLabel.label ? "black" : "transparent",
                    // border:
                    //   activeTab === modeLabel.label
                    //     ? "1px solid black"
                    //     : "transparent",
                    // color: activeTab === modeLabel.label ? "white" : "inherit",
                  };
                  const iconStyle = {
                    filter:
                      activeTab === modeLabel.label ? "invert(100%)" : "none", // Invert colors of PNG when active
                  };
                  return (
                    <Button
                      style={buttonStyle}
                      value={index}
                      key={index}
                      onClick={() => {
                        handleTabChange(modeLabel.label), setRecordingMode(index);
                      }}
                      type={activeTab === modeLabel.label ? "black" : "default"}
                    >
                      <img src={modeLabel.icon} style={iconStyle} />
                    </Button>
                  );
                })}
              </Button.Group>
            </div>

            <div className="head-title font-weight-normal">
              <h3>{activeTab}</h3>
            </div>
            <div className="setting-section">
              <p className="ls_container">Settings</p>
              {/* Camera source selection */}
              <LabelSelect
                label={LABEL.CAMERA}
                options={cameraOptions && cameraOptions}
                allowed={cameraAllowed}
                value={cameraSource}
                onChangeDeviceSource={(value) => onChangeCameraSource(value)}
              />

              {/* Microphone source selection */}
              <LabelSelect
                label={LABEL.MICROPHONE}
                options={microphoneOptions && microphoneOptions}
                allowed={microphoneAllowed}
                value={microphoneSource}
                onChangeDeviceSource={(value) => onChangeMicrophoneSource(value)}
              />
            </div>
            {warning && (
              <div
                style={{
                  fontSize: " 12px",
                  color: "#ff4d4f",
                  lineHeight: "1",
                  position: "absolute",
                  bottom: "285px",
                  background: "white",
                  padding: "0",
                  marginLeft: "55px",
                }}
              >
                Please enable your camera(microphone)!
              </div>
            )}
            <Button
              size="large"
              shape="round"
              className="record-btn"
              onClick={() => onClickRecordingStartOrStop()}
            >
              {!recordingStarted ? "Start Recording" : "Stop & Save"}
            </Button>
          </div>
        </div>

        {/* Time counter modal */}
        <TimeCounterModal
          visibleTimeCounterModal={visibleTimeCounterModal}
          countNumber={countNumber}
        />
      </div>
      {visibleEditMenu && (
        <AnnotationTool
          recordingStarted={recordingStarted}
          handleSaveRecording={() => {
            onSaveRecording();
          }}
          handlePauseResume={() => {
            onPauseResume();
          }}
        />
      )}
    </>
  );
}

export default Record;
