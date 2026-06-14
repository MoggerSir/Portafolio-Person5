import { useCallback, useState } from 'react';
import type { NavItem } from '@/core/models';
import {
  ScreenNavigationService,
  type ScreenId,
} from '@/core/services/ScreenNavigationService';

const screenNavigationService = new ScreenNavigationService();

export function useScreenNavigation(navigation: readonly NavItem[]) {
  const [activeScreen, setActiveScreen] = useState<ScreenId>(
    screenNavigationService.getDefaultScreen(),
  );

  const navigateTo = useCallback(
    (screenId: ScreenId) => {
      setActiveScreen(screenNavigationService.resolveScreen(screenId, navigation));
    },
    [navigation],
  );

  return { activeScreen, navigateTo };
}

export type { ScreenId };
