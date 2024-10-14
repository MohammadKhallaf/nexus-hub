import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, IRootState } from '@store/index';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<IRootState>();
