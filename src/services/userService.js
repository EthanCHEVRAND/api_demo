const bcrypt = require("bcrypt") ;
const userRepository = require("../repositories/userRepository") ;

const createUser = async (userData) => {
    const { password, ...rest } = userData;

    if (!password) {
        throw new error("Password is required") ;
    }

    const hashedPassword = await bcrypt.hash(password, 10) ;

    return userRepository.createUser({ ...rest, password: hashedPassword }) ;
} ;

module.exports = {
    createUser,
}