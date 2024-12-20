import { SetMetadata } from '@nestjs/common';
import { USER_TYPE } from '@prisma/client';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const IS_AVAILABLE_TO_GUEST_KEY = 'isAvailableToGuest';
export const AvailableToGuest = () =>
  SetMetadata(IS_AVAILABLE_TO_GUEST_KEY, true);

export const ONLY_TEAM_MEMBER_KEY = 'onlyTeamMember';
export const OnlyTeamMember = () => SetMetadata(ONLY_TEAM_MEMBER_KEY, true);

export const ONLY_MANAGER_KEY = 'onlyManager';
export const OnlyManager = () => SetMetadata(ONLY_MANAGER_KEY, true);

export const isTeamMember = (userType: USER_TYPE) => {
  if (!userType) return false;
  if (userType === USER_TYPE.GUEST || userType === USER_TYPE.CLIENT)
    return false;
  return true;
};

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
  RATING: 'A avaliação deve ser de 1 à 5',
  URL: 'URL inválida',
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
  NOT_AVAILABLE_TO_GUEST: 'Não disponível para usuário convidado',
  ONLY_FOR_TEAM_MEMBER: 'Apenas membros da equipe podem acessar',
  ONLY_FOR_MANAGER: 'Apenas supervisores podem acessar',
  NOT_FOUND: 'Não encontrado',
  EMAIL_ALREADY_EXISTS: 'Email já existe',
  INVALID_CREDENTIALS: 'Credenciais inválidas',
};
