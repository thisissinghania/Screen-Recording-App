export const DEVICE_ALLOWED = "You can use your device!";
export const DEVICE_BLOCKED = "Please allow permission of your device!";

export const BACKEND_URL = "https://cinema8.site/"
export const PREVRECORD_POST = "api/v1/scene/list"
export const CHECKUSER = "api/v1/personaccess/self"
export const uploadVideoEndPoint = "/api/v1/media/upload/CINEMA8_V2/VIDEO"



export const LABEL = {
  FULL_SCREEN: "Screen + Camera",
  WINDOW: "Screen only",
  // CURRENT_TAB: "Current Tab",
  CAMERA_ONLY: "Camera only",
  CAMERA: "Camera",
  MICROPHONE: "Microphone",
  RECORDING_QUALITY: "Recording quality",
  TRIM: "Trim",
  CROP: "Crop",
  BGMUSIC: "Music Over",
  FINETUNE: "Finetune",
  FILTER: "Filter",
  ANNOTATE: "Annotate",
  STICKER: "Sticker",
};

export const QUALITYOPTIONS = [
  {
    label: "Low",
    value: "100000",
  },
  {
    label: "Medium",
    value: "3000000",
  },
  {
    label: "High",
    value: "5000000",
  },
];

export const XCOUNTERS = [
  { id: 1, title: '1.0', height: '200px', width: '200px' },
  { id: 2, title: '1.5', height: '250px', width: '250px' },
  { id: 3, title: '2.0', height: '300px', width: '300px' },
];

export const SHAPE_TYPES = {
  RECT: "rect",
  ELLIPSE: "ellipse",
  TRIAGNLE: "triangle",
  STAR: "star",
  LINE: "line",
  ARROW: "arrow",
};

export const KEY_CODE = {
  RETURN: 13,
  ESCAPE: 27,
  DELETE: 46,
};

// 0: Delete, 1: TextEditor, 2: Rect, 3: Ellipse, 4: Triangle, 5: FreeHand 6: Seleted, 7:Undo
export const ANNOTATION_TOOL_SELECTION = {
  DELETE: "delete",
  TEXT_EDITOR: "text_editor",
  RECT: "rectangle",
  ELLIPSE: "ellipse",
  TRI: "triangle",
  FREE_HAND: "free_hand",
  IS_SELETED: "is_selected",
  UNDO: "undo",
  IS_NOT_SELECTED: "is_not_selected",
  STAR: "star",
  ARROW: "arrow",
  LINE: "line",
  COLOR_SELECT: "color_select",
  SHAPES: "shapes",
};

export const CANVAS_WIDTH = window.innerWidth;
export const CANVAS_HEIGHT = window.innerHeight;

export const LOCAL_STORAGE = {
  BLOB_LINK: "get_blob_link",
  RECORDING_DURATION: "recording_duration",
};
