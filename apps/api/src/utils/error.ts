import { StatusCode } from "hono/utils/http-status";
export class CustomError extends Error {
    statusCode: StatusCode;

    constructor(message: string = "Internal Error", statusCode: StatusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}
