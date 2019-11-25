export declare type CocoResponse = {
    response: string;
    component_done: boolean;
    component_failed: boolean;
    updated_context: {
        [key: string]: any;
    };
    confidence: number;
    idontknow: boolean;
    raw_resp: {
        [key: string]: any;
    };
};
export declare class ComponentSession {
    private component_id;
    private session_id;
    private developer_key;
    constructor(component_id: string, developer_key: string, session_id?: string);
    reset(session_id?: string): void;
    call(user_input?: string, context?: any): Promise<Error | CocoResponse>;
}
