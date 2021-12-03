import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  id: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
    }
  }
});

export default userSlice.reducer;

export const { setCurrentUser } = userSlice.actions;
