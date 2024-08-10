import * as jose from 'jose'
import { JWTPayloadType } from "@repo/typing/auth"


export const createAuthToken = (secret: Uint8Array, algo: string, payload: JWTPayloadType) => {
    const jwt = new jose.SignJWT(payload)
        .setProtectedHeader({ alg: algo })
        .setIssuedAt()
        .setExpirationTime("5h")
        .sign(secret)

    return jwt
}


export const createRefreshToken = (secret: Uint8Array, algo: string, payload: Pick<JWTPayloadType, 'id'>) => {
    const jwt = new jose.SignJWT(payload)
        .setProtectedHeader({ alg: algo })
        .setIssuedAt()
        .setExpirationTime("15day")
        .sign(secret)
    return jwt
}
