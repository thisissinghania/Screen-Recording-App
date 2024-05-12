import React, { useState, useRef, useEffect } from "react";
import { Button, ColorPicker, FloatButton, Modal, Popover, Slider } from "antd";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import { MdReply, MdOutlinePause, MdDeleteOutline } from "react-icons/md";

import ShapePanel from "./ShapePanel";
import AnnotationPlayField from "./AnnotationPlayField";
import { ANNOTATION_TOOL_SELECTION } from "../../utils/constants";

import "./style.css";
import {
  BgColorsOutlined,
  FontSizeOutlined,
  HighlightOutlined,
  SaveOutlined,
  SearchOutlined,
  StarOutlined,
} from "@ant-design/icons";

import {
  IoTriangleOutline,
  IoEllipseOutline,
  IoSquareOutline,
  IoArrowForward,
  IoStarOutline,
  IoRemove,
} from "react-icons/io5";

const AnnotationTool = (props) => {
  const { handleSaveRecording, handlePauseResume } = props;
  const [switchDropEditMenu, setSwitchDropEditMenu] = useState(false); // After pressing pause button
  const [visibleVolumeTrack, setVisibleVolumeTrack] = useState(true); // enable/disable audio track
  const [visibleMicrophoneTrack, setVisibleMicrophoneTrack] = useState(true); // enable/disable microphone track
  const [currentSelectedOption, setCurrentSelectedOption] = useState(
    ANNOTATION_TOOL_SELECTION.IS_NOT_SELECTED
  ); // Now, this is the option you selected. 0: Delete, 1: TextEditor, 2: Rect, 3: Ellipse, 4: Triangle, 5: FreeHand 6: Seleted, 7:Undo
  const [nowColor, setNowColor] = useState("#ff0000"); // Setted color by Color Picker
  const [nowSize, setNowSize] = useState(10); // Setted size by pencil scroll
  const [annotationToolsOpen, setAnnotationToolsOpen] = useState(false);
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(true);

  const containerRef = useRef(null);

  if (containerRef.current) {
    containerRef.current.classList.add("wd_ext_c8_container");
  }

  const [isHovered, setIsHovered] = useState({ state: false, label: "" });

  const iconMap = {
    [ANNOTATION_TOOL_SELECTION.RECT]: IoSquareOutline,
    [ANNOTATION_TOOL_SELECTION.ELLIPSE]: IoEllipseOutline,
    [ANNOTATION_TOOL_SELECTION.TRI]: IoTriangleOutline,
    [ANNOTATION_TOOL_SELECTION.LINE]: IoRemove,
    [ANNOTATION_TOOL_SELECTION.STAR]: IoStarOutline,
    [ANNOTATION_TOOL_SELECTION.ARROW]: IoArrowForward, // Assuming IoArrowForward is for arrow
    // Add more mappings for other options as needed
  };

  const SelectedIcon = iconMap[currentSelectedOption] || IoStarOutline; // Default to StarOutlined if no matching option found

  const annotationBadge = {
    dot: true,
    color: nowColor,
  };

  const freeHandContent = (
    <div>
      <Slider
        vertical
        min={1}
        max={50}
        defaultValue={nowSize}
        style={{ display: "inline-block", height: 100 }}
        onChange={(value) => setNowSize(value)}
      />
    </div>
  );

  const handlePauseResumeRecording = () => {
    setSwitchDropEditMenu(!switchDropEditMenu);
    handlePauseResume();
  };

  useEffect(() => {
    let interval = null;
    if (start) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [start]);

  const handleCancel = () => {
    setSwitchDropEditMenu(false);
    setStart(true);
  };
  return (
    <>
      <>
        <FloatButton.Group
          className="fav-buttons"
          type="primary"
          style={{
            display: "flex",
            flexDirection: "row",
            left: "40px",
            bottom: "20px",
            gap: "10px",
            width: "100%",
          }}
        >
          <FloatButton
            style={{
              position: "relative",
            }}
            icon={
              <span
                className="wd_ext_timmer_wapper"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <MdOutlinePause />
                <span className="wd_ext_timmer">
                  {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                  {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                </span>
              </span>
            }
            className="wd_ext_pause_btn mb-0"
            onClick={() => {
              setStart(false);
              handlePauseResumeRecording();
            }}
          ></FloatButton>
          <FloatButton.Group
            open={annotationToolsOpen}
            className="wd_ext_variation_wapper"
            trigger="click"
            type="default"
            style={{
              display: "Flex",
              flexDirection: "row-reverse",
              justifyContent: "flex-end",
              gap: "10px",
              width: "100%",
              position: "relative",
              marginBottom: 0, // 165
            }}
            closeIcon={<FaAngleLeft />}
            icon={<FaAngleRight />}
            onClick={() => { setAnnotationToolsOpen(!annotationToolsOpen); if (annotationToolsOpen) { setCurrentSelectedOption(ANNOTATION_TOOL_SELECTION.IS_NOT_SELECTED) } }}
          >
            <Popover
              placement="rightTop"
              trigger={"hover"}
              content={freeHandContent}
              style={{
                position: "relative",
              }}
            >
              <FloatButton
                className={`mb-0 ${currentSelectedOption === ANNOTATION_TOOL_SELECTION.FREE_HAND
                  ? "myfloatbtn"
                  : ""
                  }`}
                icon={
                  <HighlightOutlined
                    style={{
                      color:
                        currentSelectedOption ===
                          ANNOTATION_TOOL_SELECTION.FREE_HAND &&
                          isHovered.state === true &&
                          isHovered.label === ANNOTATION_TOOL_SELECTION.FREE_HAND
                          ? "rgba(0, 32, 39, 1)"
                          : currentSelectedOption ===
                            ANNOTATION_TOOL_SELECTION.FREE_HAND
                            ? "rgba(255, 255, 255, 1)"
                            : isHovered.state === true &&
                              isHovered.label ===
                              ANNOTATION_TOOL_SELECTION.FREE_HAND
                              ? "rgba(0, 32, 39, 1)"
                              : "rgba(0, 0, 0, 0.45)",
                    }}
                  />
                }
                badge={
                  currentSelectedOption ===
                  ANNOTATION_TOOL_SELECTION.FREE_HAND && annotationBadge
                }
                onClick={() =>
                  currentSelectedOption === ANNOTATION_TOOL_SELECTION.FREE_HAND
                    ? setCurrentSelectedOption(
                      ANNOTATION_TOOL_SELECTION.IS_NOT_SELECTED
                    )
                    : setCurrentSelectedOption(
                      ANNOTATION_TOOL_SELECTION.FREE_HAND
                    )
                }
                onMouseEnter={() =>
                  setIsHovered({
                    state: true,
                    label: ANNOTATION_TOOL_SELECTION.FREE_HAND,
                  })
                }
                onMouseLeave={() =>
                  setIsHovered({
                    state: false,
                    label: ANNOTATION_TOOL_SELECTION.FREE_HAND,
                  })
                }
              />
            </Popover>
            <Popover
              placement="rightTop"
              style={{
                zIndex: "99999",
                position: "relative",
              }}
              trigger={"hover"}
              content={
                <ShapePanel
                  color={nowColor}
                  currentSelectedOption={currentSelectedOption}
                  handleCurrentSelectedOption={(value) => {
                    setCurrentSelectedOption(value);
                  }}
                />
              }
            >
              <FloatButton
                className={`mb-0 ${currentSelectedOption === ANNOTATION_TOOL_SELECTION.RECT ||
                  currentSelectedOption === ANNOTATION_TOOL_SELECTION.ELLIPSE ||
                  currentSelectedOption === ANNOTATION_TOOL_SELECTION.TRI ||
                  currentSelectedOption === ANNOTATION_TOOL_SELECTION.LINE ||
                  currentSelectedOption === ANNOTATION_TOOL_SELECTION.STAR ||
                  currentSelectedOption === ANNOTATION_TOOL_SELECTION.ARROW
                  ? "myfloatbtn"
                  : ""
                  }`}
                style={{
                  fontSize: "18px",
                }}
                icon={
                  <SelectedIcon
                    style={{
                      color:
                        (currentSelectedOption ===
                          ANNOTATION_TOOL_SELECTION.RECT ||
                          currentSelectedOption ===
                          ANNOTATION_TOOL_SELECTION.ELLIPSE ||
                          currentSelectedOption ===
                          ANNOTATION_TOOL_SELECTION.TRI ||
                          currentSelectedOption ===
                          ANNOTATION_TOOL_SELECTION.LINE ||
                          currentSelectedOption ===
                          ANNOTATION_TOOL_SELECTION.STAR ||
                          currentSelectedOption ===
                          ANNOTATION_TOOL_SELECTION.ARROW) &&
                          isHovered.state === true &&
                          isHovered.label === ANNOTATION_TOOL_SELECTION.SHAPES
                          ? "rgba(0, 32, 39, 1)"
                          : currentSelectedOption ===
                            ANNOTATION_TOOL_SELECTION.RECT ||
                            currentSelectedOption ===
                            ANNOTATION_TOOL_SELECTION.ELLIPSE ||
                            currentSelectedOption ===
                            ANNOTATION_TOOL_SELECTION.TRI ||
                            currentSelectedOption ===
                            ANNOTATION_TOOL_SELECTION.LINE ||
                            currentSelectedOption ===
                            ANNOTATION_TOOL_SELECTION.STAR ||
                            currentSelectedOption ===
                            ANNOTATION_TOOL_SELECTION.ARROW
                            ? "rgba(255, 255, 255, 1)"
                            : isHovered.state === true &&
                              isHovered.label === ANNOTATION_TOOL_SELECTION.SHAPES
                              ? "rgba(0, 32, 39, 1)"
                              : "rgba(0, 0, 0, 0.45)",
                    }}
                  />
                }
                badge={
                  (currentSelectedOption === ANNOTATION_TOOL_SELECTION.RECT ||
                    currentSelectedOption ===
                    ANNOTATION_TOOL_SELECTION.ELLIPSE ||
                    currentSelectedOption === ANNOTATION_TOOL_SELECTION.TRI ||
                    currentSelectedOption === ANNOTATION_TOOL_SELECTION.LINE ||
                    currentSelectedOption === ANNOTATION_TOOL_SELECTION.STAR ||
                    currentSelectedOption ===
                    ANNOTATION_TOOL_SELECTION.ARROW) &&
                  annotationBadge
                }
                onMouseEnter={() =>
                  setIsHovered({
                    state: true,
                    label: ANNOTATION_TOOL_SELECTION.SHAPES,
                  })
                }
                onMouseLeave={() =>
                  setIsHovered({
                    state: false,
                    label: ANNOTATION_TOOL_SELECTION.SHAPES,
                  })
                }
              />
            </Popover>
            <FloatButton
              size="small"
              className={`mb-0 ${currentSelectedOption === ANNOTATION_TOOL_SELECTION.TEXT_EDITOR
                ? "myfloatbtn"
                : ""
                }`}
              icon={
                <FontSizeOutlined
                  style={{
                    color:
                      currentSelectedOption ===
                        ANNOTATION_TOOL_SELECTION.TEXT_EDITOR &&
                        isHovered.state === true &&
                        isHovered.label === ANNOTATION_TOOL_SELECTION.TEXT_EDITOR
                        ? "rgba(0, 32, 39, 1)"
                        : currentSelectedOption ===
                          ANNOTATION_TOOL_SELECTION.TEXT_EDITOR
                          ? "rgba(255, 255, 255, 1)"
                          : isHovered.state === true &&
                            isHovered.label ===
                            ANNOTATION_TOOL_SELECTION.TEXT_EDITOR
                            ? "rgba(0, 32, 39, 1)"
                            : "rgba(0, 0, 0, 0.45)",
                  }}
                />
              }
              badge={
                currentSelectedOption ===
                ANNOTATION_TOOL_SELECTION.TEXT_EDITOR && annotationBadge
              }
              onClick={() =>
                currentSelectedOption === ANNOTATION_TOOL_SELECTION.TEXT_EDITOR
                  ? setCurrentSelectedOption(
                    ANNOTATION_TOOL_SELECTION.IS_NOT_SELECTED
                  )
                  : setCurrentSelectedOption(
                    ANNOTATION_TOOL_SELECTION.TEXT_EDITOR
                  )
              }
              onMouseEnter={() =>
                setIsHovered({
                  state: true,
                  label: ANNOTATION_TOOL_SELECTION.TEXT_EDITOR,
                })
              }
              onMouseLeave={() =>
                setIsHovered({
                  state: false,
                  label: ANNOTATION_TOOL_SELECTION.TEXT_EDITOR,
                })
              }
            />

            <FloatButton
              size="small"
              className="color_picker mb-0"
              icon={
                <span className="colorpicker">
                  <BgColorsOutlined style={{ color: nowColor }} />
                  <ColorPicker
                    size="small"
                    style={{ margin: "auto" }}
                    value={nowColor}
                    onChange={(value, hex) => setNowColor(hex)}
                  />
                </span>
              }
              onClick={() => { }}
            ></FloatButton>
            <FloatButton
              className="mb-0"
              size="small"
              icon={
                <MdDeleteOutline
                  style={{
                    color:
                      isHovered.label === ANNOTATION_TOOL_SELECTION.DELETE &&
                        isHovered.state === true
                        ? "rgba(0, 0, 0, 0.88)"
                        : "rgba(0, 0, 0, 0.45)",
                  }}
                />
              }
              onClick={() =>
                currentSelectedOption === ANNOTATION_TOOL_SELECTION.DELETE
                  ? setCurrentSelectedOption(
                    ANNOTATION_TOOL_SELECTION.IS_NOT_SELECTED
                  )
                  : setCurrentSelectedOption(ANNOTATION_TOOL_SELECTION.DELETE)
              }
              onMouseEnter={() =>
                setIsHovered({
                  state: true,
                  label: ANNOTATION_TOOL_SELECTION.DELETE,
                })
              }
              onMouseLeave={() =>
                setIsHovered({
                  state: false,
                  label: ANNOTATION_TOOL_SELECTION.DELETE,
                })
              }
            />
            <FloatButton
              size="small"
              className="mb-0"
              icon={
                <MdReply
                  style={{
                    color:
                      isHovered.label === ANNOTATION_TOOL_SELECTION.UNDO &&
                        isHovered.state === true
                        ? "rgba(0, 0, 0, 0.88)"
                        : "rgba(0, 0, 0, 0.45)",
                  }}
                />
              }
              onClick={() =>
                currentSelectedOption === ANNOTATION_TOOL_SELECTION.UNDO
                  ? setCurrentSelectedOption(
                    ANNOTATION_TOOL_SELECTION.IS_NOT_SELECTED
                  )
                  : setCurrentSelectedOption(ANNOTATION_TOOL_SELECTION.UNDO)
              }
              onMouseEnter={() =>
                setIsHovered({
                  state: true,
                  label: ANNOTATION_TOOL_SELECTION.UNDO,
                })
              }
              onMouseLeave={() =>
                setIsHovered({
                  state: false,
                  label: ANNOTATION_TOOL_SELECTION.UNDO,
                })
              }
            />
          </FloatButton.Group>
        </FloatButton.Group>

        <div
          id="wd_ext_c8_container"
          className="wd_ext_c8_container"
          ref={containerRef}
        >
          <Modal
            open={switchDropEditMenu}
            title="Recording stoped"
            // onOk={handleOk}
            onCancel={handleCancel}
            width={416}
            height={724}
            footer={null}
            className="wd_ext_cinema8_modal"
          >
            <p>
              Would you like to continue to record or finish and save the
              recording?
            </p>
            <div className="wd_ext_cinema8_btn_container">
              <Button
                type="default"
                onClick={() => {
                  handleSaveRecording();
                }}
              >
                <SaveOutlined /> Save the recording
              </Button>
              <Button
                type="default"
                onClick={() => {
                  setStart(true);
                  handlePauseResumeRecording();
                }}
              >
                <SearchOutlined /> Continue
              </Button>
            </div>
          </Modal>
        </div>
      </>
      <div
        className="at_container"
        style={{
          pointerEvents:
            currentSelectedOption === ANNOTATION_TOOL_SELECTION.IS_NOT_SELECTED
              ? "none"
              : "all",
        }}
      >
        <AnnotationPlayField
          nowColor={nowColor}
          nowSize={nowSize}
          currentSelectedOption={currentSelectedOption}
          handleCurrentSelectedOption={(value) => {
            setCurrentSelectedOption(value);
          }}
        />
      </div>
    </>
  );
};

export default AnnotationTool;
