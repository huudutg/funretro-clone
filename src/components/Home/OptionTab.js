import React, { useState } from 'react';
import MenuOption from './MenuOption';

const OptionTab = () => {
    const [option, setOption] = useState('1');
    const onOptionClick = (a) => {

        setOption(a);

    };
    return (
        <div className="option-tab">
            <MenuOption
                status={option}
                onChange={onOptionClick}
            >
                <span key='1' >
                    DASHBOARD
                </span>
                <span key='2' >
                    TEAMS
                </span>
                <span key='3' >
                    ANALYTICS
                </span>
                <span key='4' >
                    BILLINGS
                </span>

            </MenuOption>
        </div>
    );
}

export default OptionTab;
