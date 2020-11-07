import React from 'react';
import { Children } from 'react'


const MenuOption = (props) => {
    return (
        <div className="MenuOption ">
            <div className="MenuOption__wrap container">

                {Children.map(props.children, (child, i) => {

                    let className = (props.status == i + 1) ? "MenuOption__wrap--active" : "";

                    return (
                        <div
                            className={`${className} option`}
                            onClick={() => props.onChange(child.key)} >
                            {child}
                        </div>

                    )
                })
                }
            </div>

        </div>
    );
}

export default MenuOption;
