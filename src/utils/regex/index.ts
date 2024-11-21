export enum REGEX {
  EMAIL_ADRESS = '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$',
  ONLY_NUMBERS = '^[0-9]*$',
}

export const validate = (value: string, regex: REGEX) => {
  const reg = new RegExp(regex);
  return reg.test(value);
};
