import React from 'react';

type Props = {
    children: JSX.Element | JSX.Element[] | undefined;
    style: React.CSSProperties
}

export default ({children, style} : Props) => {
    return(
        <div style={{...style}}>
            {children}
        </div>
    )
}
