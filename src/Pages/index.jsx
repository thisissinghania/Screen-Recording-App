import React, { useState } from 'react'
import Record from './Record'
import PrevRecording from './PrevRecording'
import Setting from './Setting/Setting'
import Header from '../Components/Header/Header'
import { useDispatch, useSelector } from "react-redux";
import WebcamDrag from '../Components/WebcamDrag'
import useDataContext from '../utils/hooks/useDataContext'

const Wrapper = () => {
    const {
        visibleWebcamDrag,
        cameraSource,
        recordingStarted
    } = useDataContext();
    const isFlipCamera =
        useSelector((state) => state.setting.flipCamera) ||
        JSON.parse(localStorage.getItem("flipCamera"));
    const [activeTab, setActiveTab] = useState(0)

    return (
        <div className="grid grid-cols-7 p-7 web_h-screen gap-3 relative w-full">
            <div className="col-span-7 flex flex-col my-auto">
                <div className="web_container max-w-[450px] w-full border-[#a1a0a0] border-2 rounded-lg p-10 mx-auto bg-[#ffffff] shadow-lg">
                    <Header setActiveTab={setActiveTab} activeTab={activeTab} />
                    <div >
                        <Record activePage={activeTab} />
                    </div>
                    {activeTab == 1 && <PrevRecording />}
                    {activeTab == 2 && <Setting />}
                    {visibleWebcamDrag && (
                        <WebcamDrag cameraDeviceId={cameraSource} isFlipCamera={isFlipCamera} recordingStarted={recordingStarted} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Wrapper