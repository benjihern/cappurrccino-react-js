import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./header.module.css";
import { useAuth } from '../../../Login/contexts/authContext';
import { doSignOut } from '../../../Login/firebase/auth';
import { useCart } from '../../../../Hooks/useCart';

export default function Header() {
  const user = {
    name: "CatGuy123",
  };

  const { cart } = useCart();

  // Logout implementation from header.jsx
  const navigate = useNavigate()
  const logout = () => { doSignOut().then(() => { navigate('/login') }) };

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          Cappurrccino
        </Link>
        <nav>
          <ul>
            {user ? (
              <li className={classes.menu_container}>
                <Link to="/profile">{user.name}</Link>
                <div className={classes.menu}>
                  <Link to="/profile">Profile</Link>
                  <Link to="/orders">Orders</Link>
                  <a onClick={logout}>Logout</a>
                </div>
              </li>
            ) : (
              <Link to="/login">Login</Link>
            )}
            <li>
              <Link to="/cart">
                Cart
                {cart.totalCount > 0 && (
                  <span className={classes.cart_count}>{cart.totalCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
