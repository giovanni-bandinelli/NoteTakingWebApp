
import Header from '../components/desktop/Header/Header';
import NavSidebar from '../components/desktop/NavSidebar/NavSidebar';
import MainView from '../components/desktop/MainView/MainView';
import styles from './DesktopLayout.module.css' //desktopContainer & Grid Styling only

export default function DesktopLayout() {

  return (
    <div className={styles.desktopContainer}>
        <NavSidebar className={styles.navbar} /> 
        <Header className={styles.header} />      
        <MainView className={styles.mainView} />
    </div>
  );
}
