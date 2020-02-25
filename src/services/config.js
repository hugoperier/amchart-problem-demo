import config from '../config.json'

export const withConfiguration = (cb) =>  {
    const env = process.env.REACT_APP_ENV?.replace(/\s/g,'')
    if (env) {
        return cb(config[env])
    }
}