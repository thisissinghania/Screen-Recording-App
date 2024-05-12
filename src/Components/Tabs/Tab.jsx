import React,{useState,useEffect} from "react";
import { Tabs } from "antd";
import { BorderlessTableOutlined, FacebookOutlined, InstagramOutlined, UserSwitchOutlined, WhatsAppOutlined } from "@ant-design/icons";
import "./style.css";
import { Segmented } from "antd";
import { Checkbox } from "antd";
import { Input,Button } from "antd";

const { TextArea } = Input;


const EmbedCode = ({modalData}) => {

  const [iFrame, setIFrame] = useState('')
  const [showControls, setShowControls] = useState(true);
  const [startTime, setStartTime] = useState(0);
  const [selectedOption, setSelectedOption] = useState("Fixed");
  const [includeStartTime, setIncludeStartTime] = useState(true);
  const title = modalData.name;

  useEffect(() => {

    const videoSrc = `https://cinema8.site/video/${modalData?.hashId}?${includeStartTime ? `t=${startTime}` : ''}${showControls ? "" : "&controls=0"}`;
    if (selectedOption === "Fixed") {
      setIFrame(`<iframe src="${videoSrc}" 
        width="650px" height="269px" 
        gesture="media" allow="autoplay; fullscreen; microphone; camera" 
        frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>
      </iframe>`);
    } else if (selectedOption === "Responsive") {
      setIFrame(`<iframe src="${videoSrc}"
      width="854px" height="480px"
      gesture="media" allow="autoplay; fullscreen; microphone; camera"
      frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>
    </iframe>`);
    }
  }, [selectedOption, modalData?.hashId, showControls, startTime, includeStartTime]);



  console.log("modalData>>>>>>",modalData);

  const onChangeCheckBox = (e) => {
    console.log(`checked = ${e.target.checked}`);
    setShowControls(e.target.checked);
  };

  const onChangeNumberHandler = (value) => {
    console.log("changed", value.target.value);
    setStartTime(+value.target.value);
  };

  const IframetypeHandler = (value) => {
    setSelectedOption(value);
  };

  const onIncludeStartTimeChange = (e) => {
    setIncludeStartTime(e.target.checked);
  };

  // const IframetypeHandler = (value) => {
  //   if (value === "Responsive") {
  //     setIFrame(`<iframe src="${videoSrc}"
  //     width="854px" height="480px"
  //     gesture="media" allow="autoplay; fullscreen; microphone; camera"
  //     frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>
  //   </iframe>`);
  //   } else {
  //     setIFrame(`<iframe src="${videoSrc}" 
  //       width="650px" height="269px" 
  //       gesture="media" allow="autoplay; fullscreen; microphone; camera" 
  //       frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>
  //     </iframe>`);
  //   }
  // };

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(iFrame);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`https://cinema8.site/video/${modalData?.hashId}?${includeStartTime ? `t=${startTime}` : ''}${showControls ? "" : "&controls=0"}`);
  };



  return (
    <>
      <iframe
        width="650"
        height="269"
        src={`https://cinema8.site/video/${modalData?.hashId}?${includeStartTime ? `t=${startTime}` : ''}${showControls ? "" : "&controls=0"}`}
        title={title}
        allowFullScreen={false}
      ></iframe>
      <div className="controls">
        <Segmented
          options={["Fixed", "Responsive"]}
          onChange={IframetypeHandler}
          defaultValue="Fixed"
        />
        <div className="start-at">
          <Checkbox onChange={onIncludeStartTimeChange} defaultChecked={true} />
          <p className="checkbox-text">Start at</p>
          <Input
            size="small"
            min={1}
            max={999}
            type="number"
            defaultValue={0}
            onChange={onChangeNumberHandler}
          />
        </div>
        <div className="players-controls">
          <Checkbox onChange={onChangeCheckBox}  defaultChecked={true}  />
          <p className="checkbox-text" >Show players control</p>
        </div>
      </div>
      <div className="embed-code">
      <TextArea rows={4}  value={iFrame}  />
      <Button type="primary" onClick={copyEmbedCode}>#Copy embed code</ Button>
      </div>
      <div className="link" ><Input value={`https://cinema8.site/video/${modalData?.hashId}?${includeStartTime ? `t=${startTime}` : ''}${showControls ? "" : "&controls=0"}`} />
      <Button type="default" onClick={copyLink} >#Copy link</ Button>
      </div>
    </>
  );
};

const SocialShare = ({modalData}) => {

  const socialLinkHandler =(value)=>{
    if(value==="whatsapp"){
      window.open(`https://wa.me/?text=https://cinema8.site/video/${modalData?.hashId}`)
    }else if(value==="instagram"){
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://cinema8.site/video/${modalData?.hashId}`)

    }else if (value==='facebook'){
      window.open(`https://www.facebook.com/sharer/sharer.php?u=https://cinema8.site/video/${modalData?.hashId}`)
    }
  }
  return (
    <>
      <div className="socila-media">
      <Button type="default" className="social-icon-btn" onClick={()=>socialLinkHandler('whatsapp')} ><WhatsAppOutlined  /> Whatsapp</ Button>
      <Button type="default" className="social-icon-btn" onClick={()=>socialLinkHandler('instagram')} > <InstagramOutlined  /> Instagram</ Button>
      <Button type="default" className="social-icon-btn" onClick={()=>socialLinkHandler('facebook')}  ><FacebookOutlined  /> FaceBook</ Button>
      </div>
    </>
  );
};

const Tab = ({modalData}) => {
  const TabData = [
    {
      id: 1,
      label: `Embed Code`,
      icon: <BorderlessTableOutlined />,
      children: <EmbedCode modalData={modalData} />,
    },
    {
      id: 2,
      label: `Social Share`,
      icon: <UserSwitchOutlined />,
      children: <SocialShare  modalData={modalData}/>,
    },
  ];

  return (
    <>
      <Tabs
        defaultActiveKey="2"
        // style={{ width: '718px', height: '672px' }}
        className="sharetab"
        items={TabData.map((tab, i) => {
          return {
            key: tab.id,
            label: tab.label,
            children: tab.children,
            icon: tab.icon,
          };
        })}
      />
    </>
  );
};

export default Tab;
