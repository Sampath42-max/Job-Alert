import React from 'react';
import Select from 'react-select';

function CustomSelect({ items, placeholder, selected, setSelected, isMulti = false }) {
    const options = items.map(item => ({ value: item, label: item }));

    return (
        <Select
            options={options}
            value={isMulti ? selected.map(s => ({ value: s, label: s })) : { value: selected, label: selected }}
            onChange={(option) => {
                if (isMulti) {
                    setSelected(option ? option.map(o => o.value) : []);
                } else {
                    setSelected(option ? option.value : '');
                }
            }}
            placeholder={placeholder}
            isMulti={isMulti}
            className="basic-multi-select"
            classNamePrefix="select"
            styles={{
                control: (base) => ({
                    ...base,
                    backgroundColor: 'white',
                    borderColor: '#e2e8f0',
                    borderRadius: '0.75rem',
                    padding: '0.5rem',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                }),
                menu: (base) => ({
                    ...base,
                    zIndex: 9999,
                }),
            }}
        />
    );
}

export default CustomSelect;