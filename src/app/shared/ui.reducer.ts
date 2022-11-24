import { createReducer, on } from '@ngrx/store';
import { isLoadingAction, stopLoadingAction } from './ui.actions';

export interface State {

  isLoading: boolean

}


export const initialState: State = {
  isLoading: false
};

export const isLoadingReducer = createReducer(

  initialState,

  on(isLoadingAction, (state) => ({...state, isLoading: true})),

  on(stopLoadingAction, (state) => ({...state, isLoading: false})),

);
