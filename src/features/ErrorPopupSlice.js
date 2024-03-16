import { createSlice } from '@reduxjs/toolkit';

export const ErrorPopupSlice = createSlice({
  name: 'errorpopup',
  initialState: { data: '' ,
  type: '',
  show: false
},
  reducers: {
    setPopup: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { setPopup } = ErrorPopupSlice.actions;

export default ErrorPopupSlice.reducer;