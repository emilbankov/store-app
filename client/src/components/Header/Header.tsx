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
                    to="/add-products" 
                    className={({ isActive }) => 
                        isActive ? styles.active : undefined
                    }
                >
                    Добавяне на продукти
                </NavLink>
                <NavLink 
                    to="/sold-products" 
                    className={({ isActive }) => 
                        isActive ? styles.active : undefined
                    }
                >
                    Продадени продукти
                </NavLink>
                <NavLink 
                    to="/report" 
                    className={({ isActive }) => 
                        isActive ? styles.active : undefined
                    }
                >
                    Отчет
                </NavLink>
            </nav>
        </header>
    );
}
