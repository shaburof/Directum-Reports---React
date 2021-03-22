import React, { useState } from 'react';

const Store: React.FC = (props) => {
    // let [dd, setDD] = useState<Date>(new Date());

    return <>{props.children}</>
}


export { Store };