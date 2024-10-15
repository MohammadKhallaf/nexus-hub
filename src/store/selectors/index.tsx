import { useAppSelector } from '@hooks';

export const useAuthSelector = () => useAppSelector((state) => state.auth);
export const useChatSelector = () => useAppSelector((state) => state.chat);
