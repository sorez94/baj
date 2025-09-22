import { useAppDispatch, useAppSelector } from '@/store';
import {
  selectTheme,
  selectThemeMode,
  selectIsDark,
  setThemeMode,
  toggleTheme,
  updateSystemTheme,
} from '@/store/uiSlice';
import { ThemeMode } from '@/store/uiSlice';

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const themeMode = useAppSelector(selectThemeMode);
  const isDark = useAppSelector(selectIsDark);

  const setMode = (mode: ThemeMode) => {
    dispatch(setThemeMode(mode));
  };

  const toggle = () => {
    dispatch(toggleTheme());
  };

  const updateSystem = (isDarkMode: boolean) => {
    dispatch(updateSystemTheme(isDarkMode));
  };

  return {
    // State
    theme,
    mode: themeMode,
    isDark,
    
    // Actions
    setMode,
    toggle,
    updateSystem,
  };
}; 