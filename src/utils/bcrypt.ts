import * as bcrypt from 'bcrypt'

const saltRounds = Number(process.env.BC_SALT)

export const hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

export const descryptHash = (password: string, hash: string): boolean => {
    const isMatch = bcrypt.compareSync(password, hash)
    return isMatch
}