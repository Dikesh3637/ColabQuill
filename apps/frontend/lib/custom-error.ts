export class CustomError extends Error {
	statusCode: number;
	constructor(message: string = "Internal Error", statusCode: number = 500) {
		super(message);
		this.statusCode = statusCode;
	}
}
