
import DesktopHeader from '../components/desktop/Header/Header';
import styles from './DesktopLayout.module.css'

export default function DesktopLayout() {
  return (
    <div className={styles.desktopContainer}>

      <DesktopHeader />

    </div>
  );
}

{/**

import DesktopNavSidebar from '../components/desktop/DesktopNavSidebar';
import DesktopNotesList from '../components/desktop/DesktopNotesList';
import DesktopNoteContent from '../components/desktop/DesktopNoteContent';
import DesktopActionsPanel from '../components/desktop/DesktopActionsPanel';

<DesktopNavSidebar />
<DesktopNotesList />
<DesktopNoteContent />
<DesktopActionsPanel />    
    
 */}