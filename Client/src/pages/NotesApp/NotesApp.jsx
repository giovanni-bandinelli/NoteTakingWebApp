import { useResponsive } from '../../hooks/useResponsive';
import DesktopLayout from '../../layouts/DesktopLayout';
import MobileLayout from '../../layouts/MobileLayout';
import {MainViewProvider} from '../../context/MainViewContext';

export default function NotesApp() {
  const { isDesktop } = useResponsive();

  return (
    <MainViewProvider>
      {isDesktop ? <DesktopLayout /> : <MobileLayout />}
    </MainViewProvider>
  );
}
