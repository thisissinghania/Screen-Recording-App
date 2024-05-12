import React from "react";
import { SHAPE_TYPES } from "../../utils/constants";
import {
  IoTriangleOutline,
  IoEllipseOutline,
  IoSquareOutline,
  IoArrowForward,
  IoStarOutline,
  IoRemove,
} from "react-icons/io5";
import { ANNOTATION_TOOL_SELECTION } from "../../utils/constants";
import "./style.css";

const ShapePanel = (props) => {
  const { currentSelectedOption, handleCurrentSelectedOption } = props;

  return (
    <>
      <div className="sp_container">
        <div
          data-shape={SHAPE_TYPES.RECT}
          className={
            currentSelectedOption === ANNOTATION_TOOL_SELECTION.RECT
              ? "sp_content_selected"
              : "sp_content"
          }
          onClick={() =>
            currentSelectedOption === ANNOTATION_TOOL_SELECTION.RECT
              ? handleCurrentSelectedOption(
                ANNOTATION_TOOL_SELECTION.IS_NOT_SELECTED
              )
              : handleCurrentSelectedOption(ANNOTATION_TOOL_SELECTION.RECT)
          }
        >
          <IoSquareOutline
            style={{
              color:
                currentSelectedOption === ANNOTATION_TOOL_SELECTION.RECT
                  ? "rgba(255,255,255,1)"
                  : "rgba(0,0,0,0.45)",
              margin: "7px",
              height: "20px",
              width: "20px",
            }}
          />
          <span>Rectangle</span>
        </div>
        <div
          data-shape={SHAPE_TYPES.ELLIPSE}
          // style={{ color: "#121212" }}
          className={
            currentSelectedOption === ANNOTATION_TOOL_SELECTION.ELLIPSE
              ? "sp_content_selected"
              : "sp_content"
          }
          onClick={() =>
            currentSelectedOption === ANNOTATION_TOOL_SELECTION.ELLIPSE
              ? handleCurrentSelectedOption(
                ANNOTATION_TOOL_SELECTION.IS_NOT_SELECTED
              )
              : handleCurrentSelectedOption(ANNOTATION_TOOL_SELECTION.ELLIPSE)
          }
        >
          <IoEllipseOutline
            style={{
              color:
                currentSelectedOption === ANNOTATION_TOOL_SELECTION.ELLIPSE
                  ? "rgba(255,255,255,1)"
                  : "rgba(0,0,0,0.45)",
              margin: "7px",
              height: "20px",
              width: "20px",
            }}
          />
          <span>Oval</span>
        </div>
        <div
          data-shape={SHAPE_TYPES.TRIAGNLE}
          // style={{ color: "#121212" }}
          className={
            currentSelectedOption === ANNOTATION_TOOL_SELECTION.TRI
              ? "sp_content_selected"
              : "sp_content"
          }
          onClick={() =>
            currentSelectedOption === ANNOTATION_TOOL_SELECTION.TRI
              ? handleCurrentSelectedOption(
                ANNOTATION_TOOL_SELECTION.IS_NOT_SELECTED
              )
              : handleCurrentSelectedOption(ANNOTATION_TOOL_SELECTION.TRI)
          }
        >
          <IoTriangleOutline
            style={{
              color:
                currentSelectedOption === ANNOTATION_TOOL_SELECTION.TRI
                  ? "rgba(255,255,255,1)"
                  : "rgba(0,0,0,0.45)",
              margin: "7px",
              height: "20px",
              width: "20px",
            }}
            onClick={() =>
              currentSelectedOption === ANNOTATION_TOOL_SELECTION.TRI
                ? handleCurrentSelectedOption(
                  ANNOTATION_TOOL_SELECTION.IS_NOT_SELECTED
                )
                : handleCurrentSelectedOption(ANNOTATION_TOOL_SELECTION.TRI)
            }
          />
          <span>Triangle</span>
        </div>
        <div
          data-shape={SHAPE_TYPES.STAR}
          // style={{ color: "#121212" }}
          className={
            currentSelectedOption === ANNOTATION_TOOL_SELECTION.STAR
              ? "sp_content_selected"
              : "sp_content"
          }
          onClick={() =>
            currentSelectedOption === ANNOTATION_TOOL_SELECTION.STAR
              ? handleCurrentSelectedOption(
                ANNOTATION_TOOL_SELECTION.IS_NOT_SELECTED
              )
              : handleCurrentSelectedOption(ANNOTATION_TOOL_SELECTION.STAR)
          }
        >
          <IoStarOutline
            style={{
              color:
                currentSelectedOption === ANNOTATION_TOOL_SELECTION.STAR
                  ? "rgba(255,255,255,1)"
                  : "rgba(0,0,0,0.45)",
              margin: "7px",
              height: "20px",
              width: "20px",
            }}
          />
          <span>Star</span>
        </div>
        <div
          data-shape={SHAPE_TYPES.LINE}
          // style={{ color: "#121212" }}
          className={
            currentSelectedOption === ANNOTATION_TOOL_SELECTION.LINE
              ? "sp_content_selected"
              : "sp_content"
          }
          onClick={() =>
            currentSelectedOption === ANNOTATION_TOOL_SELECTION.LINE
              ? handleCurrentSelectedOption(
                ANNOTATION_TOOL_SELECTION.IS_NOT_SELECTED
              )
              : handleCurrentSelectedOption(ANNOTATION_TOOL_SELECTION.LINE)
          }
        >
          <IoRemove
            style={{
              color:
                currentSelectedOption === ANNOTATION_TOOL_SELECTION.LINE
                  ? "rgba(255,255,255,1)"
                  : "rgba(0,0,0,0.45)",
              margin: "7px",
              height: "20px",
              width: "20px",
            }}
            onClick={() =>
              currentSelectedOption === ANNOTATION_TOOL_SELECTION.LINE
                ? handleCurrentSelectedOption(
                  ANNOTATION_TOOL_SELECTION.IS_NOT_SELECTED
                )
                : handleCurrentSelectedOption(ANNOTATION_TOOL_SELECTION.LINE)
            }
          />
          <span>Line</span>
        </div>
        <div
          data-shape={SHAPE_TYPES.ARROW}
          // style={{ color: "#121212" }}
          className={
            currentSelectedOption === ANNOTATION_TOOL_SELECTION.ARROW
              ? "sp_content_selected"
              : "sp_content"
          }
          onClick={() =>
            currentSelectedOption === ANNOTATION_TOOL_SELECTION.ARROW
              ? handleCurrentSelectedOption(
                ANNOTATION_TOOL_SELECTION.IS_NOT_SELECTED
              )
              : handleCurrentSelectedOption(ANNOTATION_TOOL_SELECTION.ARROW)
          }
        >
          <IoArrowForward
            style={{
              color:
                currentSelectedOption === ANNOTATION_TOOL_SELECTION.ARROW
                  ? "rgba(255,255,255,1)"
                  : "rgba(0,0,0,0.45)",
              margin: "7px",
              height: "20px",
              width: "20px",
            }}
          />
          <span>Arrow</span>
        </div>
      </div>
    </>
  );
};
export default ShapePanel;
