import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    value: 0,
}
export const IdSlice = createSlice({
    name: 'id',
    initialState,
    reducers: {
        setId: (state, action) => {
            state.value = action.payload
            localStorage.setItem('video-id', action.payload)
        }
    },
})

// Action creators are generated for each case reducer function
export const { setId } = IdSlice.actions

export default IdSlice.reducer