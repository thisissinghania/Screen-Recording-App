import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    quality: "30000",
    showCountDown: true,
    flipCamera: false,
    commentAndReaction: false
}
export const SettingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        setQuality: (state, action) => {
            // console.log("action.payload.quality>>", action.payload)
            state.quality = action.payload
            localStorage.setItem('quality', action.payload)
        },
        setIsShowCountDown: (state, action) => {
            // console.log("action.payload.count>>", action.payload)
            state.showCountDown = action.payload
            localStorage.setItem('showCountDown', action.payload)
        },
        setFlipCamera: (state, action) => {
            state.flipCamera = action.payload
            localStorage.setItem('flipCamera', action.payload)
        },
        setCommentAndReaction: (state, action) => {
            state.commentAndReaction = action.payload
            localStorage.setItem('commentAndReaction', action.payload)
        }
    },
})

// Action creators are generated for each case reducer function
export const { setQuality, setIsShowCountDown, setFlipCamera, setCommentAndReaction } = SettingSlice.actions

export default SettingSlice.reducer