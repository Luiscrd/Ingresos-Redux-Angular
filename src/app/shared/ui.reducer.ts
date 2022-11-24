import { createReducer, on } from '@ngrx/store';
import { isLoading } from './ui.actions';


export const initialState = true;

export const isLoadingReducer = createReducer(
  initialState,
  on(isLoading, (state) => state),

);
