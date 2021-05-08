"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CompilationErrors extends Error {
    constructor(errors) {
        const mapError = errors.map((e) => { return e.formattedMessage || e.message; });
        super(mapError.join('\n'));
        this.errors = errors;
        this.name = 'CompilationErrors';
    }
}
exports.CompilationErrors = CompilationErrors;
//# sourceMappingURL=types.js.map