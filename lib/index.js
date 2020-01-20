"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid = require("uuid/v4");
var request = require("request");
function exchange(component_id, session_id, user_input, context, developer_key) {
    if (developer_key === void 0) { developer_key = ""; }
    return new Promise(function (resolve, reject) {
        var payload = {};
        user_input && (payload.user_input = user_input);
        context && (payload.context = context);
        request({
            method: "POST",
            url: "https://marketplace.conversationalcomponents.com/api/exchange/" + component_id + "/" + session_id,
            body: JSON.stringify(payload),
            headers: { "api-key": developer_key }
        }, function (error, response, body) {
            if (response.statusCode !== 200) {
                reject(new Error(response.body));
            }
            if (error) {
                reject(error);
                return;
            }
            try {
                var bodyJson = JSON.parse(body);
                resolve(__assign(__assign({}, bodyJson), { raw_resp: response }));
            }
            catch (e) {
                reject(e);
            }
        });
    });
}
exports.exchange = exchange;
;
var ComponentSession = /** @class */ (function () {
    function ComponentSession(component_id, developer_key, session_id) {
        if (session_id === void 0) { session_id = uuid(); }
        this.component_id = "";
        this.session_id = "";
        this.developer_key = "";
        this.component_id = component_id;
        this.session_id = session_id;
        this.developer_key = developer_key;
    }
    ComponentSession.prototype.reset = function (session_id) {
        if (session_id === void 0) { session_id = uuid(); }
        this.session_id = session_id;
    };
    ComponentSession.prototype.call = function (user_input, context) {
        return exchange(this.component_id, this.session_id, user_input, context);
    };
    return ComponentSession;
}());
exports.ComponentSession = ComponentSession;
