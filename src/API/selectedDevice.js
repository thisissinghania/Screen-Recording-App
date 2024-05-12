import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    cameraSelected: { label: "No Camera", value: "No Camera" },
    micSelected: { label: "No Microphone", value: "No Microphone" },
    isRecording: false,
}
export const DeviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setCamera: (state, action) => {
            state.cameraSelected = action.payload
            localStorage.setItem('cameraSelected', action.payload)
        },
        setMic: (state, action) => {
            state.micSelected = action.payload
            localStorage.setItem('micSelected', action.payload)
        },
        setRecordingState: (state, action) => {
            console.log("action.payload.cameraSelected>>", action.payload)
            state.isRecording = action.payload
            localStorage.setItem('isRecording', action.payload)
        }
    },
})

// Action creators are generated for each case reducer function
export const { setCamera, setMic, setRecordingState, } = DeviceSlice.actions

export default DeviceSlice.reducer