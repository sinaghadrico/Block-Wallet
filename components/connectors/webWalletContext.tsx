/* eslint-disable @typescript-eslint/no-unused-vars */
import { useReducer, createContext } from "react";

const ACTION_TYPES = {};
const initialState = {};

const WebWalletContext = createContext(initialState as any);

const reducer = (state: any, action: any) => {
    const { type, value } = action;
    switch (type) {
        default:
            return state;
    }
};
const WebWalletProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <WebWalletContext.Provider value={value}>{children}</WebWalletContext.Provider>;
};

WebWalletProvider.defaultProps = {};
export { WebWalletProvider, WebWalletContext };
