import React from "react";
import { fabric } from "fabric";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../utils/constants";

export function arePointsOutOfRange(
  x,
  y,
  canvasWidth = CANVAS_WIDTH,
  canvasHeight = CANVAS_HEIGHT
) {
  return x > canvasWidth || y > canvasHeight || x < 0 || y < 0;
}

export function createRect(x, y, penColor, penSize, readonly = false) {
  const rect = new fabric.Rect({
    left: x,
    top: y,
    originX: "left",
    originY: "top",
    width: 0,
    height: 0,
    fill: "transparent",
    stroke: penColor,
    borderColor: "white",
    strokeWidth: penSize,
    selectable: !readonly,
  });
  rect.set("strokeUniform", true);
  rect.setControlsVisibility({ mtr: false });

  return rect;
}

export function createEllipse(x, y, penColor, penSize, readonly = false) {
  const ellipse = new fabric.Ellipse({
    left: x,
    top: y,
    originX: "left",
    originY: "top",
    rx: 0,
    ry: 0,
    fill: "transparent",
    stroke: penColor,
    strokeWidth: penSize,
    selectable: !readonly,
  });
  ellipse.set("strokeUniform", true);
  ellipse.setControlsVisibility({ mtr: false });

  return ellipse;
}

export function createText(x, y, fontSize, penColor, readonly = false) {
  const text = new fabric.Textbox("Here is Text Editor", {
    left: x,
    top: y,
    originX: "left",
    originY: "top",
    fill: penColor,
    width: 0,
    height: 0,
    selectable: !readonly,
    fontSize,
    lockScalingY: true,
    editable: true,
  });
  text.set({ strokeUniform: true });
  text.setControlsVisibility({
    mtr: false,
    tl: false,
    tr: false,
    bl: false,
    br: false,
    mb: false,
    mt: false,
  });

  return text;
}

export function createTriangle(x, y, penColor, penSize, readonly = false) {
  const triangle = new fabric.Triangle({
    left: x,
    top: y,
    width: 0,
    height: 0,
    fill: "transparent",
    stroke: penColor,
    strokeWidth: penSize,
    selectable: !readonly,
  });
  triangle.set("strokeUniform", true);
  triangle.setControlsVisibility({ mtr: false });

  return triangle;
}

export function resizeRect(rect, origX, origY, x, y) {
  if (x < origX) rect.set({ left: x });
  if (y < origY) rect.set({ top: y });

  rect.set({
    width: Math.abs(origX - x),
    height: Math.abs(origY - y),
  });
}

export function resizeEllipse(ellipse, origX, origY, x, y) {
  if (x < origX) ellipse.set({ left: x });
  if (y < origY) ellipse.set({ top: y });

  ellipse.set({ rx: Math.abs(origX - x) / 2, ry: Math.abs(origY - y) / 2 });
}

export function resizeText(text, origX, x) {
  if (x < origX) text.set({ left: x });

  text.set({
    width: Math.abs(origX - x),
  });
}

export function resizeTriangle(triangle, origX, origY, x, y) {
  if (x < origX) triangle.set({ left: x });
  if (y < origY) triangle.set({ top: y });

  triangle.set({
    width: Math.abs(origX - x),
    height: Math.abs(origY - y),
  });
}



export function createLine(
  x1,
  y1,
  x2,
  y2,
  penColor,
  penSize,
  readonly = false
) {
  const points = [x1, y1, x2, y2];
  const line = new fabric.Line(points, {
    fill: penColor,
    stroke: penColor,
    strokeWidth: penSize,
    selectable: !readonly,
  });
  line.setControlsVisibility({ mtr: false });
  return line;
}

// Function to create a star shape
function generateStarPoints(centerX, centerY, outerRadius, innerRadius, arms) {
  var angle = Math.PI / arms;
  var starPoints = [];
  for (var i = 0; i < 2 * arms; i++) {
    var radius = i % 2 === 0 ? outerRadius : innerRadius;
    var x = centerX + Math.cos(i * angle) * radius;
    var y = centerY + Math.sin(i * angle) * radius;
    starPoints.push({ x: x, y: y });
  }
  return starPoints;
}

export const createStar = (
  origX,
  origY,
  penColor,
  penSize,
  readonly = false
) => {
  console.log("function call >>>>", penColor, penSize);
  const starPoints = generateStarPoints(origX, origY, 50, 25, 5);
  console.log("starPoints>>", starPoints);
  const star = new fabric.Polygon(starPoints, {
    fill: "transparent",
    stroke: penColor,
    strokeWidth: penSize,
    selectable: !readonly,
  });
  return star;
};

export const resizeStar = (star, origX, origY, pointerX, pointerY) => {
  // Calculate the distance between the original position and the new pointer position

  const deltaX = pointerX - origX;
  const deltaY = pointerY - origY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  // Adjust the outer and inner radius of the star based on the distance
  const outerRadius = distance / 2;
  const innerRadius = outerRadius / 2;

  // Generate new star points with the adjusted radii
  const starPoints = generateStarPoints(
    origX,
    origY,
    outerRadius,
    innerRadius,
    5
  );

  // Update the existing star object with the new points
  star.set({ points: starPoints });

  // Render the canvas
  canvas.renderAll();
};

export function resizeLine(line, x1, y1, x2, y2) {
  line.set({ x1, y1, x2, y2 });
}

export function createArrow(x, y, penColor, penSize, readonly = false) {
  // Create three lines to form an arrow shape pointing to the right
  const line1 = new fabric.Line([x, y, x - 50, y - 50], {
    stroke: penColor,
    strokeWidth: penSize,
    selectable: !readonly,
  });
  const line2 = new fabric.Line([x, y, x - 50, y + 50], {
    stroke: penColor,
    strokeWidth: penSize,
    selectable: !readonly,
  });
  const line3 = new fabric.Line([x - 250, y, x, y], {
    stroke: penColor,
    strokeWidth: penSize,
    selectable: !readonly,
  });

  // Group the lines into a fabric.Group
  const arrow = new fabric.Group([line1, line2, line3], {
    selectable: !readonly,
  });

  return arrow;
}
