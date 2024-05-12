import React, { useState } from "react";
import { Button } from "antd";
import {
  LoginOutlined,
  EditOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import "./style.css";
import Header from "../../Components/Header/Header";
import ShareModel from "../../Components/ShareModel/ShareModel";
const FirstRecord = () => {
  const videoSrc = "https://www.youtube.com/embed/52oYstRw6iw";
  const title = "HRM and Project Management Tool by Creative Buffer : Part 2";
  const token = true;

  const editorPageHandler = () => {
    // chrome.runtime.sendMessage(
    //   {
    //     action: "EditorPage",
    //     url: chrome.runtime.getURL("https://reactnative.dev/"),
    //   },
    //   function (response) {
    //     console.log(response.SUCCESS);
    //   }
    // );
  };

  const signUpPageHandler = () => {
    // chrome.runtime.sendMessage(
    //   {
    //     action: "SignUpPage",
    //     url: chrome.runtime.getURL("https://cinema8.site/signin"),
    //   },
    //   function (response) {
    //     console.log(response.SUCCESS);
    //   }
    // );
  };



  const [isOpen, setIsOpen] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
    // chrome.storage.sync.set({ ["VISIBLE_MODAL"]: false });
  };
  const shareVideoHandler = () => {
    setIsOpen(true);
  }

  return (
    <div className="grid grid-cols-7 p-7 web_h-screen gap-3 relative w-full">
      <div className="col-span-7 flex flex-col my-auto">
        <div className="max-w-[450px] w-full border-[#a1a0a0] border-2 rounded-lg p-10 mx-auto bg-[#ffffff] shadow-lg">
          <Header />
          <div className="container">
            <div className="section">
              <div className="container-1">
                <div className="text-congrts">Congratulations</div>
                <div>
                  <iframe
                    width="420"
                    height="320"
                    src={videoSrc}
                    title={title}
                    allowFullScreen={false}
                  ></iframe>
                  {/* If Need then we can use video tag */}
                  {/* <video controls width="220" height="127">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
                </div>
                {token ? (
                  <div className="text-container">Your recording is ready</div>
                ) : (
                  <div className="text-container">
                    <div>You created your first recording.</div>
                    <div>To save and share it please sign in.</div>
                  </div>
                )}
              </div>
              <div className="btn-share">
                {token ? (
                  <div className="edit-share-btn">
                    <Button
                      className="btn-1"
                      shape="round"
                      onClick={editorPageHandler}
                    >
                      <EditOutlined />
                      <span>Edit</span>
                    </Button>
                    <Button
                      className="btn-1"
                      type="primary"
                      shape="round"
                      onClick={shareVideoHandler}
                    >
                      <ShareAltOutlined />
                      <span>Share</span>
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="btn-1"
                    size="large"
                    type="primary"
                    shape="round"
                    onClick={signUpPageHandler}
                  >
                    <LoginOutlined />
                    <span>Sign In</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <ShareModel onClose={handleCancel} isOpen={isOpen} />}
    </div>
  );
};

export default FirstRecord;
