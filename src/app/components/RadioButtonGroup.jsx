"use client";

import RadioButton from "@/app/components/RadioButton";
import {useState} from "react";
import styles from "./RadioButtonGroup.module.css";

export default function RadioButtonGroup({
                                             object,
                                             name,
                                             changeApiRequestMap,
                                         }) {
    const iterator = new Map(Object.entries(object));
    const keysIterator = iterator.keys();
    let firstKey = keysIterator.next().value;
    const [selectedApiResponse, setSelectedApiResponse] = useState(firstKey);
    const handleChange = (event) => {
        setSelectedApiResponse(event.target.value);

        changeApiRequestMap(name, event.target.value);

    };

    return (
        <div className={styles.container}>
            {Object.entries(object).map(([key, value]) => (
                <RadioButton
                    key={key}
                    value={key}
                    checked={selectedApiResponse === key}
                    onChange={handleChange}
                    title={value}
                    name={name}
                />
            ))}
        </div>
    );
}


