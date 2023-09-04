/**
 * Messages dictionary to display user-friendly messages depending on validator name
 */
export default [
  {
    validator: 'required',
    message: 'This field is required'
  },
  {
    validator: 'alpha',
    message: 'The field accepts only alphabet characters'
  },
  {
    validator: 'isPhone',
    message: "This field shouldn't contain alphabet characters"
  }
]
