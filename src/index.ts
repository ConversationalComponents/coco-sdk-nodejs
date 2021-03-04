const { v4: uuid } = require("uuid");
import request = require("request");

export type CocoResponse = {
  response: string;
  component_done: boolean;
  component_failed: boolean;
  updated_context: { [key: string]: any };
  confidence: number;
  idontknow: boolean;
  raw_resp: { [key: string]: any };
};

export function exchange(
  component_id: string,
  session_id: string,
  user_input?: string,
  context?: any,
  developer_key: string = ""
) {
  return new Promise<CocoResponse>((resolve, reject) => {
    const payload = {} as any;
    user_input && (payload.user_input = user_input);
    context && (payload.context = context);
    request(
      {
        method: "POST",
        url: `https://cocohub.ai/api/exchange/${component_id}/${session_id}`,
        body: JSON.stringify(payload),
        headers: { "api-key": developer_key },
      },
      function (error, response, body) {
        if (response.statusCode !== 200) {
          reject(new Error(response.body));
        }
        if (error) {
          reject(error as Error);
          return;
        }
        try {
          const bodyJson = JSON.parse(body);
          resolve({ ...bodyJson, raw_resp: response } as CocoResponse);
        } catch (e) {
          reject(e as Error);
        }
      }
    );
  });
}

export class ComponentSession {
  private component_id = "";
  private session_id = "";
  private developer_key = "";

  constructor(
    component_id: string,
    developer_key: string,
    session_id: string = uuid()
  ) {
    this.component_id = component_id;
    this.session_id = session_id;
    this.developer_key = developer_key;
  }

  reset(session_id: string = uuid()) {
    this.session_id = session_id;
  }

  call(user_input?: string, context?: any) {
    return exchange(this.component_id, this.session_id, user_input, context);
  }
}
