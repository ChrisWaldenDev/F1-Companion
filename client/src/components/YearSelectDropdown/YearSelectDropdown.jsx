import {useEffect, useState} from 'react';
import './yearselectdropdown.css';

function YearSelectDropdown({options, onSelect, selectedValue}) {
    const [selectedYear, setSelectedYear] = useState(options[0]);

    useEffect(() => {
        setSelectedYear(selectedValue);
    }, [selectedValue])
    function handleChange(event) {
        setSelectedYear(event.target.value);
        onSelect(event.target.value);
    }

    return (
        <>
            <select value={selectedYear} onChange={handleChange}>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </>
    );
}

export default YearSelectDropdown;