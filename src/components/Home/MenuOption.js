import React from 'react';
import { Children } from 'react'


const MenuOption = (props) => {
    return (
        <div className="MenuOption ">
            <div className="MenuOption__wrap container">

                {Children.map(props.children, (child, i) => {

                    let className = (props.status == i + 1) ? "MenuOption__wrap--active" : "";

                    return (
                        <a
                            href="#"
                            className={className}
                            onClick={() => props.onChange(child.key)} >
                            {child}
                        </a>

                    )
                })
                }
            </div>

        </div>
    );
}

export default MenuOption;
