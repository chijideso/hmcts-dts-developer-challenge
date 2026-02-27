import type{ TypedUseSelectorHook} from 'react-redux';
import {  useDispatch, useSelector } from 'react-redux';
import type{ RootState, AppDispatch } from '../Redux/store';

// 1. Use throughout your app instead of plain `useDispatch`
// This knows about your specific Thunks and Actions
export const useAppDispatch = () => useDispatch<AppDispatch>();

// 2. Use throughout your app instead of plain `useSelector`
// This knows exactly what data is in your 'cases' slice
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;