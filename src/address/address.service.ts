import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Address, Prisma } from '@prisma/client';

type AddressByCep = {
  cep: string; // '01001-000'
  logradouro: string; // 'Praça da Sé'
  complemento: string; // 'lado ímpar'
  unidade: string; // ''
  bairro: string; // 'Sé'
  localidade: string; // 'São Paulo'
  uf: string; // 'SP'
  estado: string; // 'São Paulo'
  regiao: string; // 'Sudeste'
  ibge: string; // '3550308'
  gia: string; // '1004'
  ddd: string; // '11'
  siafi: string; // '7107'
  erro?: boolean;
};

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async createAddress(data: Prisma.AddressCreateInput): Promise<Address> {
    return this.prisma.address.create({
      data,
    });
  }

  async updateAddress(params: {
    where: Prisma.AddressWhereUniqueInput;
    data: Prisma.AddressUpdateInput;
  }): Promise<Address> {
    const { where, data } = params;
    return this.prisma.address.update({
      data,
      where,
    });
  }

  async findOne(params: {
    where: Prisma.AddressWhereUniqueInput;
    select?: Prisma.AddressSelect;
  }): Promise<Address | null> {
    const { where, select } = params;
    return this.prisma.address.findUnique({
      where,
      select,
    });
  }

  async findAll(): Promise<Address[]> {
    return this.prisma.address.findMany();
  }

  async getAddressByCep(cep: string) {
    try {
      const address = (await fetch(
        `https://viacep.com.br/ws/${cep}/json/`,
      ).then((res) => res.json())) as AddressByCep;

      if (address.erro) {
        throw new BadRequestException('CEP não encontrado ou inválido');
      }

      return {
        cep: address.cep,
        street: address.logradouro,
        number: address.unidade,
        city: address.localidade,
      };
    } catch (error) {
      throw new BadRequestException('CEP não encontrado ou inválido');
    }
  }
}
