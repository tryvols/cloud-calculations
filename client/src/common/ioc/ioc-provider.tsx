import React, { useContext, FC } from 'react';
import { Container, interfaces } from 'inversify';
import 'reflect-metadata';
import { container } from './index';

const InversifyContext = React.createContext<{ container: Container | null }>({ container: null });

export const IocProvider: FC = (props) => {
    return (
        <InversifyContext.Provider value={{ container }}>
            {props.children}
        </InversifyContext.Provider>
    );
};

export function useInject<T>(identifier: interfaces.ServiceIdentifier<T>) {
    const { container } = useContext(InversifyContext);
    if (!container) { throw new Error(); }
    return container.get<T>(identifier);
};