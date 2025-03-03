import { useMediaQuery } from 'react-responsive';

export function useResponsive() {
  const isDesktop = useMediaQuery({ minWidth: 800 });
  const isTabletLandscape = useMediaQuery({ minWidth: 600, orientation: 'landscape' });

  return { isDesktop: isDesktop || isTabletLandscape, isMobile: !isDesktop };
}
