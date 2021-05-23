import { useState } from 'react';

export const useInput = initialValue => {

    const [value, setValue] = useState(initialValue);

    return {
        value,
        setValue,
        reset: () => setValue(''),
        bind:{
            value,
            onChange: event => {
                setValue(event.target.value);
            }
        }
    }
}

export const useCheckbox = initialValue => {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        setValue,
        reset: () => setValue(false),
        bind:{
            checked: value,
            onChange: () => { setValue(!value); }
        }
    }
}