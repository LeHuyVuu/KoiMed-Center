import { createAsyncThunk, createSlice ,} from '@reduxjs/toolkit';

// Async action to fetch user profile data
export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async () => {
  const response = await fetchUserProfile(); // Assuming you have an API to fetch the user profile
  return response;
});

const initialState = {
  isAuthorized: localStorage.getItem("accessToken") ? true : false, 
  customer: {},
  veterinarian: {},
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthorized: (state, action) => {
      state.isAuthorized = action.payload;
    },

    setUser: (state, action) => { // Đổ dữ liệu user vào state
      return { ...state, ...action.payload };
    
    },
    
    updateUser: (state, action) => { // Cập nhật thông tin user
     state.customer = { ...state.customer, ...action.payload };
    },

    setCustomer: (state, action) => {
      state.customer = action.payload;
    },

    setVeterinarian: (state, action) => {
      state.veterinarian = action.payload;
    },

    updateUserInfo: (state, action) => {
      state.customer = { ...state.customer, ...action.payload };
    },
    
    clearUser: () => initialState, // Reset user về giá trị ban đầu
  },
});


export const { setUser, updateUser, clearUser,
   setIsAuthorized, setCustomer, setVeterinarian, updateUserInfo } = userSlice.actions;

// Export reducer để sử dụng trong store
export default userSlice.reducer;
