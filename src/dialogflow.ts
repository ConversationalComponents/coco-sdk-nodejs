import { exchange } from "./index"


export function cocoComponent(componentId: string) {
    return (agent: any) => {
        const sessionId = agent.session.split("/").slice(-1).pop();
        return exchange(componentId, sessionId, agent.query).then(function(result){
             agent.add(result.response);
            if (!result.component_done){
                agent.setContext({ name: 'coco', lifespan: 1, parameters: { componentId: componentId}});
            }});
    };
  };
  
export function cocoContext(agent: any) {
      const sessionId = agent.session.split("/").slice(-1).pop();
      const componentId = agent.getContext("coco").parameters.componentId;
        return exchange(componentId, sessionId, agent.query).then(function(result){
           agent.add(result.response);
             if (!result.component_done){
                agent.setContext({ name: 'coco', lifespan: 1, parameters: { componentId: componentId}});	
          }
      });
  };