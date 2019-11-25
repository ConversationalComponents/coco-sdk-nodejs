import uuid = require("uuid/v4");
import request = require("request");

export type CocoResponse = {
    response: string;
    component_done: boolean;
    component_failed: boolean;
    updated_context: {[key: string]: any};
    confidence: number;
    idontknow: boolean;
    raw_resp: {[key: string]: any};
};

export class ComponentSession {
    private component_id = "";
    private session_id = "";
    private developer_key = "";

    constructor(component_id: string, developer_key: string, session_id: string = uuid()) {
        this.component_id = component_id;
        this.session_id = session_id;
        this.developer_key = developer_key;
    }

    reset(session_id: string = uuid()) {
        this.session_id = session_id;
    }

    call(user_input?: string, context?: any) {
        return new Promise<CocoResponse | Error>((resolve, reject) => {
            const payload = {} as any;
            user_input && (payload.user_input = user_input);
            context && (payload.context = context);
            request(
                {
                    method: "POST",
                    url: `https://app.coco.imperson.com/api/exchange/${this.component_id}/${this.session_id}`,
                    body: JSON.stringify(payload),
                    headers: {"api-key": this.developer_key}
                },
                function(error, response, body) {
                    if (response.statusCode !== 200) {
                        reject(new Error(response.body));
                    }
                    if (error) {
                        reject(error as Error);
                        return;
                    }
                    try {
                        const bodyJson = JSON.parse(body);
                        resolve({...bodyJson, raw_resp: response} as CocoResponse);
                    } catch (e) {
                        reject(e as Error);
                    }
                }
            );
        });
    }
}

module.exports = ComponentSession;
