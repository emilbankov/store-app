import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        isActive ? styles.active : undefined
                    }
                >
                    Налични продукти
                </NavLink>
                <NavLink 
                    to="/add-product" 
                    className={({ isActive }) => 
                        isActive ? styles.active : undefined
                    }
                >
                    Добавяне на продукти
                </NavLink>
                <NavLink 
                    to="/orders-history" 
                    className={({ isActive }) => 
                        isActive ? styles.active : undefined
                    }
                >
                    История
                </NavLink>
            </nav>
        </header>
    );
}
