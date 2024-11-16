import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { getUserInfo } from 'service/opencagedataApi';

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const currencySlice = createAppSlice({
  name: 'currency',
  initialState: {
    baseCurrency: '',
    isLoading: false,
    error: null,
  },
  selectors: { selectBaseCurrency: state => state.baseCurrency },

  //the same as createAsyncThunk (new version). Learn how to read correctly!!!!  (https://redux-toolkit.js.org/api/createSlice)
  reducers: create => ({
    fetchBaseCurrency: create.asyncThunk(
      async ({ latitude, longitude }, { rejectWithValue, getState }) => {
        try {
          const baseCurrency = getState().currency.baseCurrency;
          if (baseCurrency) return rejectWithValue(null);
          const data = await getUserInfo({
            latitude,
            longitude,
          });

          return data.results[0].annotations.currency.iso_code;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      },
      {
        pending: state => {
          state.isLoading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.baseCurrency = action.payload;
        },
        rejected: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      },
    ),
    setDefaultCurrency: create.reducer((state, action) => {
      state.baseCurrency = action.payload;
    }),
    //   abraKadabra: create.reducer((state, action) => {
    //       state.baseCurrency
    //   })
  }),
});

export const { selectBaseCurrency } = currencySlice.selectors;

export const { fetchBaseCurrency, setDefaultCurrency } = currencySlice.actions;
