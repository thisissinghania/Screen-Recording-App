// import Img from "../../assets/Img.png";
import { ShareAltOutlined } from "@ant-design/icons";
import "./style.css";
// import useDataContext from '../../utils/hooks/useDataContext'
const Recordlist = ({recording, onShareVideo  }) => {
  // const {  shareVideoHandler} =  useDataContext();
console.log("recording?.image?.url",recording);

  return (
    <div className="recoding">
      <div className="record-title">
        <img  className="prevRecord" src={recording?.image?.url} />
        <p>{recording.name}</p>
      </div>
      <div>
        <ShareAltOutlined className="larger-icon" onClick={()=> onShareVideo(recording)} />
      </div>
    </div>
  );
};

export default Recordlist;
