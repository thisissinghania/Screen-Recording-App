import "./style.css";
// import useDataContext from '../../utils/hooks/useDataContext';
import { useLocation } from "react-router-dom";
import { Button } from "antd";
import { VideoCameraAddOutlined } from "@ant-design/icons";
import recoding from "../../assets/Content.png";
import prevRecoding from "../../assets/_Button_ (1).png";
import setting from "../../assets/_Button_ (2).png";
import logo from "../../assets/Logos.png";
import useDataContext from "../../utils/hooks/useDataContext";
const Header = ({ activeTab, setActiveTab }) => {
  const { IsLogIn, PageHandler } = useDataContext();
  const location = useLocation();
  // console.log("location>>", location.pathname);
  // console.log("IsLogIn>>", IsLogIn);

  return (
    <div className="header-container">
      <div className="header-content">
        <img src={logo} />
      </div>
      {location?.pathname === "/recording" ? (
        <Button shape="round" className="header-content">
          <VideoCameraAddOutlined />
          <span>New Recording</span>
        </Button>
      ) : (
        <div className="icons">
          <img
            className={`header-btn ${activeTab == 0 && 'active-header'}`}
            src={recoding}
            onClick={() => {
              // PageHandler("/firstRecording");
              // PageHandler("/");
              setActiveTab(0)
            }}
          />
          {/* <img src='../../assets/_Button_ (1).png'  /> */}
          {IsLogIn.username?.length > 0 && (
            <img
              className={`header-btn ${activeTab == 1 && 'active-header'}`}
              src={prevRecoding}
              onClick={() => {
                // PageHandler("/prevRecording");
                setActiveTab(1)
              }}
            />
          )}

          <img
            className={`header-btn ${activeTab == 2 && 'active-header'}`}
            src={setting}
            onClick={() => {
              // PageHandler("/setting");
              setActiveTab(2)
            }}
          />
          {/* <img src='../../assets/Content.png' /> */}
        </div>
      )}
    </div>
  );
};

export default Header;
