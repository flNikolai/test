export interface Props {
  modelValue: string | number
  isDisabled: boolean
  isReadonly: boolean
  id: string
  errorMessage: string
  label: string
  type: 'text' | 'password'
  placeholder: string
}
