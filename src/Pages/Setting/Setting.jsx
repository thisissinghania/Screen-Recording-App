import { useState, useEffect, useLayoutEffect } from "react";
import "./style.css";
import { Switch } from "antd";
import { Select } from "antd";
import { QUALITYOPTIONS } from "../../utils/constants";
import Header from "../../Components/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuality,
  setIsShowCountDown,
  setFlipCamera,
  setCommentAndReaction,
} from "../../API/settingSlice";

const Setting = () => {
  const [qualityDefaultValue, setQualityDefaultValue] = useState({
    label: "Medium",
    value: "3000000",
  }); // Recording quality status
  const [showCountDown, setShowCountDown] = useState(
    useSelector((state) => state.setting.quality) ||
    JSON.parse(localStorage.getItem("quality")) ||
    false
  );
  const [isFlipCamera, setIsFlipCamera] = useState(false);
  const [isReactionOnVideo, setIsReactionOnVideo] = useState(false);

  const quality =
    useSelector((state) => state.setting.quality) ||
    localStorage.getItem("quality");
  const isShowCountDown =
    useSelector((state) => state.setting.showCountDown) ||
    JSON.parse(localStorage.getItem("showCountDown"));
  const flipCamera =
    useSelector((state) => state.setting.flipCamera) ||
    JSON.parse(localStorage.getItem("flipCamera"));
  const commentAndReaction =
    useSelector((state) => state.setting.commentAndReaction) ||
    JSON.parse(localStorage.getItem("commentAndReaction"));
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    console.log(
      "localStorage.getItem('showCountDown')",
      localStorage.getItem("showCountDown")
    );
    if (quality) {
      console.log("quality>", quality);
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
    console.log("isShowCountDown>>", isShowCountDown);
    setShowCountDown(JSON.parse(isShowCountDown) ?? true);
    // if (isShowCountDown) {

    // console.log("flipCamera>>", typeof flipCamera);
    // console.log("flipCamera>>", JSON.parse(flipCamera));
    // }
    if (flipCamera) {
      setIsFlipCamera(flipCamera ?? false);
    }
    if (commentAndReaction) {
      setIsReactionOnVideo(commentAndReaction ?? true);
    }
  }, [commentAndReaction, flipCamera, isShowCountDown, quality]);

  const onQualityDefaultValue = (value) => {
    let tempOption;
    if (value === "100000") {
      dispatch(setQuality(value));
      tempOption = {
        label: "Low",
        value: "100000",
      };
    } else if (value === "3000000") {
      dispatch(setQuality(value));
      tempOption = {
        label: "Medium",
        value: "3000000",
      };
    } else if (value === "5000000") {
      dispatch(setQuality(value));
      tempOption = {
        label: "High",
        value: "5000000",
      };
    }
    setQualityDefaultValue(tempOption);
  };

  const handleSwitchChangeShowCountDown = (checked) => {
    // console.log("eee>>", checked)
    dispatch(setIsShowCountDown(checked));
    setShowCountDown(checked);
  };

  const handleSwitchChangeFlipCamera = (checked) => {
    dispatch(setFlipCamera(checked));
    localStorage.setItem('flipCamera', checked)
    setIsFlipCamera(checked);
  };
  const handleSwitchChangeReactionOnVideo = (checked) => {
    localStorage.setItem('commentAndReaction', checked)
    dispatch(setCommentAndReaction(checked));
    setIsReactionOnVideo(checked);
  };
  // console.log("setShowCountDown>.", setShowCountDown);
  return (

    <div className="web_container_body setting-part">
      <h2 className="title">
        <strong>Settings</strong>
      </h2>
      <div className="select-quality">
        <p>
          <strong>Video Quality</strong>
        </p>
        <Select
          defaultValue={qualityDefaultValue.label}
          value={qualityDefaultValue.value}
          style={{ width: 120 }}
          options={QUALITYOPTIONS}
          onChange={(e) => onQualityDefaultValue(e)}
        />
      </div>
      <div className="switch-label">
        <div className="switch-btn">
          <Switch
            checked={showCountDown}
            onChange={(e) => handleSwitchChangeShowCountDown(e)}
          />{" "}
          <p>Show Countdown</p>
        </div>
        <p className="switch-description">
          If turned on, a countdown will be shown before recording starts.
        </p>
      </div>
      <div className="switch-label">
        <div className="switch-btn">
          <Switch
            checked={isFlipCamera}
            onChange={handleSwitchChangeFlipCamera}
          />{" "}
          <p>Flip Camera</p>
        </div>
        <p className="switch-description">
          If turned on, camera will be flipped.{" "}
        </p>
      </div>
      <div className="switch-label">
        <div className="switch-btn">
          <Switch
            checked={isReactionOnVideo}
            onChange={handleSwitchChangeReactionOnVideo}
          />{" "}
          <p>Get Comments and reaction to videos</p>
        </div>
        <p className="switch-description">
          If turned on, your viewers will be able to leave comments or give
          reactions to your video on the timeline.{" "}
        </p>
      </div>
      <div></div>
      <div></div>
    </div>

  );
};

export default Setting;
