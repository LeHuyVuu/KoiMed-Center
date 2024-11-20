import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 0,
  bookingData: {
    type: null,
    serviceFor: null,
    vetId: "SKIP",
    date: null,
    startAt: null,
    endAt: null,
    serviceId: null,
    paymentInfo: {},
    selected: [], // Add Koi/Pond ID
  },
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1
    },
    setStep: (state, action) => {
      state.step = action.payload
    },
    setBookingData: (state, action) => {
      state.bookingData = { ...state.bookingData, ...action.payload }
    },
    resetBoking: (state) => {
      state.step = 0;
      state.bookingData = initialState.bookingData;
    }

  }

})
export const { nextStep, prevStep, setBookingData, resetBoking, setStep } = bookingSlice.actions;
export default bookingSlice.reducer;