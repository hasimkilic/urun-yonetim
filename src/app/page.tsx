import React, { ReactNode } from 'react';

const Page: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div>{children}</div>;
};


export default Page;
