export {}

/**
 * @typedef {Object} AuthContextType
 * @property {Error} [error]
 * @property {(error:Error)=>void} setError
 * @property {UserDataResponse} [user]
 * @property {(user?:UserDataResponse)=>void} setUser
 * @property {boolean} isLoading
 * @property {(state:boolean)=>void} setIsLoading
 * @property {boolean} isLoggedIn
 */
/**
 * @typedef {Object} SignInRequest
 * @property {string} username
 * @property {string} password
 */
/**
 * @typedef {Object} SignUpRequest
 * @property {string} username
 * @property {string} password
 * @property {string} user_type
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} photo_url
 * @property {string} phone_number
 * @property {string} address
 */
/**
 * @typedef {Object} UserDataResponse
 * @property {number} id
 * @property {string} username
 * @property {string} user_type
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} photo_url
 * @property {string} phone_number
 * @property {string} address
 */
