import * as crypto from "crypto";
export function isValidSignatureForAlchemyRequest(request, signingKey) {
    return isValidSignatureForStringBody(request.alchemy.rawBody, request.alchemy.signature, signingKey);
}
export function isValidSignatureForStringBody(body, signature, signingKey) {
    const hmac = crypto.createHmac("sha256", signingKey); // Create a HMAC SHA256 hash using the signing key
    hmac.update(body, "utf8"); // Update the token hash with the request body using utf8
    const digest = hmac.digest("hex");
    return signature === digest;
}
export function addAlchemyContextToRequest(req, _res, buf, encoding) {
    const signature = req.headers["x-alchemy-signature"];
    // Signature must be validated against the raw string
    var body = buf.toString(encoding || "utf8");
    req.alchemy = {
        rawBody: body,
        signature: signature,
    };
}
export function validateAlchemySignature(signingKey) {
    return (req, res, next) => {
        if (!isValidSignatureForAlchemyRequest(req, signingKey)) {
            const errMessage = "Signature validation failed, unauthorized!";
            res.status(403).send(errMessage);
            throw new Error(errMessage);
        }
        else {
            next();
        }
    };
}
//# sourceMappingURL=webhooksUtil.js.map