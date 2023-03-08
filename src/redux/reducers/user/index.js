const User = (
    state = {},
    action
) => {
    switch (action.type) {
        case "SET_USER": {
            return {
                ...state,
                ...action.data
            }
        }
        case "SESSION_CHECK": {
            return {
                ...state,
                ...action.data
            }
        }
        case "UPDATE_USER": {
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.data
                }
            }
        }
        case "EMAIL_VERIFIED": {
            return {
                ...state,
                user: {
                    ...state.user,
                    emailVerified: "true"
                }
            }
        }
        default: {
            return { ...state }
        }
    }
}

export default User
