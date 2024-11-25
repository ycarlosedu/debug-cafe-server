import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const INVALID = {
  EMAIL: 'Email inválido',
  PHONE: 'Telefone inválido',
  CEP: 'CEP inválido',
  CPF: 'CPF inválido',
  CREDIT_CARD: 'Cartão inválido',
  EXPIRATION_DATE: 'A data deve ser no formato Mês/Ano',
  NUMBER: 'Número inválido',
  ONLY_NUMBERS: 'Apenas números são permitidos',
  USER_TYPE: 'Tipo de usuário inválido',
};

export const REQUIRED = {
  FIELD: 'Campo obrigatório',
  MIN: (min: number) => `Mínimo de ${min} caracteres`,
  MAX: (max: number) => `Máximo de ${max} caracteres`,
  MAX_STARS: 'Máximo de 5 estrelas',
};

export const ERROR = {
  GENERIC: 'Erro inesperado, tente novamente mais tarde!',
  UNAUTHORIZED: 'Não autorizado',
  NOT_FOUND: 'Não encontrado',
  EMAIL_ALREADY_EXISTS: 'Email já existe',
  INVALID_CREDENTIALS: 'Credenciais inválidas',
};
