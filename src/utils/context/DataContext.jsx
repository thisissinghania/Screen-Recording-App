import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DataContext = createContext({});
export const DataProvider = ({ children }) => {
  const navigate = useNavigate();
  const [IsLogIn, setIsLogIn] = useState([])
  const [recordingMode, setRecordingMode] = useState(0); // Recording status: 0(Full Screen), 1(Window), 2(Current Tab), 3(Camera only)
  const [qualityDefaultValue, setQualityDefaultValue] = useState("3000000"); // Recording quality status
  const [visibleEditMenu, setVisibleEditMenu] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recordingStarted, setRecordingStarted] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [visibleWebcamDrag, setVisibleWebcamDrag] = useState(false);
  const [cameraSource, setCameraSource] = useState("No Camera");
  const [cameraAllowed, setCameraAllowed] = useState(false); // Camera permission status
  const [microphoneAllowed, setMicrophoneAllowed] = useState(false); // Microphone permission status

  const PageHandler = (path) => {
    navigate(path)
  }



  return (
    <DataContext.Provider
      value={{
        PageHandler,
        IsLogIn,
        setIsLogIn,
        recordingMode, setRecordingMode,
        qualityDefaultValue, setQualityDefaultValue,
        visibleEditMenu, setVisibleEditMenu,
        recordedChunks, setRecordedChunks,
        recordingStarted, setRecordingStarted,
        fileLoading, setFileLoading,
        visibleWebcamDrag, setVisibleWebcamDrag,
        cameraSource, setCameraSource,
        cameraAllowed, setCameraAllowed,
        microphoneAllowed, setMicrophoneAllowed,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
