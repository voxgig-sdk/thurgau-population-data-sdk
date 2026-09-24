"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThurgauPopulationDataError = void 0;
class ThurgauPopulationDataError extends Error {
    isThurgauPopulationDataError = true;
    sdk = 'ThurgauPopulationData';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.ThurgauPopulationDataError = ThurgauPopulationDataError;
//# sourceMappingURL=ThurgauPopulationDataError.js.map