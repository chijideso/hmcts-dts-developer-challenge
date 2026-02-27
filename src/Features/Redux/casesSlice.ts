import { createSlice} from '@reduxjs/toolkit';
import type{  PayloadAction } from '@reduxjs/toolkit';
import type{ CasesState, HMCTSCase } from '../cases/types';

const initialState: CasesState = {
  items: [],
  loading: false,
  error: null,
};

const caseSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {
    addCase: (state, action: PayloadAction<HMCTSCase>) => {
      state.items.push(action.payload);
    },
    updateStatus: (state, action: PayloadAction<{ id: string; status: HMCTSCase['status'] }>) => {
      const existingCase = state.items.find(c => c.id === action.payload.id);
      if (existingCase) {
        existingCase.status = action.payload.status;
      }
    },
    deleteCase: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(c => c.id !== action.payload);
    },
    // Inside your caseSlice.ts reducers:
updateCase: (state, action: PayloadAction<HMCTSCase>) => {
  const index = state.items.findIndex(c => c.id === action.payload.id);
  if (index !== -1) {
    state.items[index] = action.payload;
  }
},
  },
});

export const { addCase, updateStatus, deleteCase, updateCase } = caseSlice.actions;
export default caseSlice.reducer;