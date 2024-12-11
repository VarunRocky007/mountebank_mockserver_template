"use client";
import styles from "./page.module.css";

export default function Page() {
    return <div className={styles.container}>
        <h1>Login</h1>
        <form className={styles.loginForm}>
            <input className={styles.mobileInput} placeholder="Mobile" type="text"/>
            <button className={styles.loginButton + ' primary'}>Login</button>
        </form>
        <h1>Register</h1>
        <button className={styles.loginButton}>Create default user</button>
        <button onClick={() => window.location = "/"} className={styles.loginButton}>Create custom user</button>
    </div>;
}
