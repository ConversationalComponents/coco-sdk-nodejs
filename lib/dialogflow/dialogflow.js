"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
function cocoComponent(componentId) {
    return function (agent) {
        var sessionId = agent.session
            .split("/")
            .slice(-1)
            .pop();
        return index_1.exchange(componentId, sessionId, agent.query).then(function (result) {
            agent.add(result.response);
            if (!result.component_done) {
                agent.setContext({
                    name: "coco",
                    lifespan: 1,
                    parameters: { componentId: componentId }
                });
            }
        });
    };
}
exports.cocoComponent = cocoComponent;
function cocoContext(agent) {
    var sessionId = agent.session
        .split("/")
        .slice(-1)
        .pop();
    var componentId = agent.getContext("coco").parameters.componentId;
    return index_1.exchange(componentId, sessionId, agent.query).then(function (result) {
        agent.add(result.response);
        if (!result.component_done) {
            agent.setContext({
                name: "coco",
                lifespan: 1,
                parameters: { componentId: componentId }
            });
        }
    });
}
exports.cocoContext = cocoContext;
