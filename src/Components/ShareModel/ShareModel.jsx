// import React,{useState} from "react";
import { Modal ,Button } from "antd";
import Tab from "../Tabs/Tab";
const ShareModel = ({ modalData,onClose, isOpen}) => {

    // const [loading, setLoading] = useState(false);
    // const [open, setOpen] = useState(true);

  
    // const handleOk = () => {
    //   setLoading(true);
    //   setTimeout(() => {
    //     setLoading(false);
    //     setOpen(false);
    //   }, 3000);
    // };
  
    // const handleCancel = () => {
    //   // setOpen(false);
    //   // chrome.storage.sync.set({ ["VISIBLE_MODAL"]: false });
    // };

    // console.log("isModelOpen",isModelOpen);
  return (
    <>
      <Modal
        open={isOpen}
        title="Share"
        // onOk={handleOk}
        onCancel={onClose}
        width={718}
        height={724}
        // footer={[
        //   <Button key="back" onClick={handleCancel}>
        //     Return
        //   </Button>,
        //   <Button
        //     key="submit"
        //     type="primary"
        //     loading={loading}
        //     onClick={handleOk}
        //   >
        //     Submit
        //   </Button>,
        //   <Button
        //     key="link"
        //     href="https://google.com"
        //     type="primary"
        //     loading={loading}
        //     onClick={handleOk}
        //   >
        //     Search on Google
        //   </Button>,
        // ]}
        footer={null} 
      >
      <Tab modalData={modalData}  />
      </Modal>
    </>
  );
};

export default ShareModel;
