import '../../styles/components/layout/Nav.css';
import { NavLink } from "react-router-dom";


const Nav = (props) => {
    return (
        <nav>
            <div className="holder">
                <ul>
                    <li>< NavLink to="/" className={({ isActive }) => isActive ? "activo" :
                        undefined}>Bienvenidos</ NavLink></li>
                    <li>< NavLink to="/nosotros" className={({ isActive }) => isActive ? "activo" :
                        undefined}>Nosotros</ NavLink></li>
                    <li>< NavLink to="/productos" className={({ isActive }) => isActive ? "activo" :
                        undefined}>Productos</ NavLink></li>
                    <li>< NavLink to="/contacto" className={({ isActive }) => isActive ? "activo" :
                        undefined}>Contacto</ NavLink></li >
                </ul>
            </div>
        </nav >
    );
}

export default Nav;