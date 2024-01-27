import isUndefined from "lodash-es/isUndefined.js";
import omitBy from "lodash-es/omitBy.js";

export const makeHttpResponse = ({ code, message, requestId = undefined, data = undefined }) =>
    omitBy({ code, message, requestId, data }, isUndefined);

export default (_req, res, next) => {
    res.success = (obj = {}) => {
        const { message, data } = { message: "Successful Request", data: obj };
        const formattedResponse = makeHttpResponse({ code: 200, message, data });
        res.send(formattedResponse);
    };
    
    next();
};