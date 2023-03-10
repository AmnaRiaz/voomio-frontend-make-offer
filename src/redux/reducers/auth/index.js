import { SESSION } from "../../constants"

const Auth = (
    state = {
        isSession: false,
        session: {
            roles: "customer"
        }
    },
    action
) => {
    switch (action.type) {
        case SESSION: {
            return {
                ...state,
                isSession: true,
                token: action.payload.token,
                session: {
                    ...action.payload.user
                }
            }
        }
        default: {
            return { ...state }
        }
    }
}
export default Auth
