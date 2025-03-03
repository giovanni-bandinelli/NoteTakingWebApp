import { useResponsive } from '../../hooks/useResponsive';
import DesktopLayout from '../../layouts/DesktopLayout';
import MobileLayout from '../../layouts/MobileLayout';

export default function App() {
  const { isDesktop } = useResponsive();

  return isDesktop ? <DesktopLayout /> : <MobileLayout />;
}
