import { helpers } from 'vuelidate/dist/validators.min.js'
const isPhone = helpers.regex('isPhone', /^(?=.*?[1-9])[0-9()-.\sx]+$/)
export default isPhone
