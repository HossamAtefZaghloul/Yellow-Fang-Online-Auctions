import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum AuctionStatus {
  NotStarted = 'notStarted',
  Live = 'live',
  Sold = 'sold',
}

interface AuctionState {
  name: string;
  description: string;
  image: string;
  startingPrice: number;
  auctionStartDate?: Date;
  auctionEndDate?: Date;
  auctionStatus: AuctionStatus;  
}

const initialState: AuctionState = {
  name: '',
  description: '',
  image: '',
  startingPrice: 0,
  auctionStartDate: undefined,
  auctionEndDate: undefined,
  auctionStatus: AuctionStatus.NotStarted, 
};

const auctionSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    setAuctionDetails: (
      state,
      action: PayloadAction<Omit<AuctionState, 'auctionStatus'>>
    ) => {
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.image = action.payload.image;
      state.startingPrice = action.payload.startingPrice;
      state.auctionStartDate = action.payload.auctionStartDate;
      state.auctionEndDate = action.payload.auctionEndDate;
      state.auctionStatus = AuctionStatus.NotStarted; 
    },
    startAuction: (state) => {
      state.auctionStatus = AuctionStatus.Live; 
    },
    endAuction: (state) => {
      state.auctionStatus = AuctionStatus.Sold; 
    },
    resetAuction: (state) => {
      state = initialState; 
    },
  },
});

// Export the actions for use in components
export const { setAuctionDetails, startAuction, endAuction, resetAuction } = auctionSlice.actions;

// Export the reducer to be used in the store
export default auctionSlice.reducer;
