"use client";
import styles from "./RadioButton.module.css";

export default function RadioButton({title, name, value, onClick ,checked, onChange}) {
    return (
        <label className={styles.container} >{title}
            <input type="radio" value={value} checked={checked} onClick={onClick} name={name} onChange={onChange}/>
            <span className={styles.checkmark}></span>
        </label>
    );
}