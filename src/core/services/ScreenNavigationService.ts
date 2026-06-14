import type { NavItem } from '@/core/models';

export type ScreenId = 'inicio' | 'proyectos' | 'sobre-mi' | 'contacto';

export class ScreenNavigationService {
  getDefaultScreen(): ScreenId {
    return 'inicio';
  }

  resolveScreen(screenId: string, navigation: readonly NavItem[]): ScreenId {
    const isValid = navigation.some((item) => item.id === screenId);
    return isValid ? (screenId as ScreenId) : this.getDefaultScreen();
  }

  getScreenIndex(screenId: ScreenId, navigation: readonly NavItem[]): number {
    return navigation.findIndex((item) => item.id === screenId);
  }

  getScreenIds(navigation: readonly NavItem[]): ScreenId[] {
    return navigation.map((item) => item.id as ScreenId);
  }
}
