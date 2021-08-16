import { Request, Response } from 'express';
import { cpf as CPFValidator } from 'cpf-cnpj-validator';

interface Item {
  cpf: string;
  description: string;
}

interface CPFs {
  values: Array<Item>
} 

const CPFs: CPFs = { values: [] };

export const getAllCPF = ( request: Request, response: Response) => {
  return response.status(200).json(CPFs.values);
}

export const getCheckedCPF = ( request: Request, response: Response) => {
  const { cpf } = request.params;  

  const checkedCPF = CPFs.values.find(value => value.cpf === cpf);

  if (!checkedCPF) {
    return response.status(404).json({ "message": "CPF not found" })
  }

  return response.status(200).json({ "CPF": checkedCPF });
}

export const checkCPF = ( request: Request, response: Response) => {
  const { cpf } = request.body;

  const result = CPFValidator.isValid(cpf) ? "valido" : "invalido";

  if (result === "valido") {
    CPFs.values.push({
      cpf,
      description: result
    });
  }

  const cpfReturn = `{ "${cpf}" : "${result}" }`; 

  return response.status(201).json(JSON.parse(cpfReturn));
}

export const updateCPFDescription = ( request: Request, response: Response) => {
  const { cpf } = request.params;
  const { description } = request.body;

  const checkedCPF = CPFs.values.find(value => value.cpf === cpf);

  if (!checkedCPF) {
    return response.status(404).json({ "message": "CPF not found" })
  }

  CPFs.values.map(value => {
    if (value.cpf === cpf) {
      value.description = description;
    }
  });

  return response.status(200).json({ "CPF" : checkedCPF })
}

export const deleteCPFHistory = ( request: Request, response: Response) => {
  const { cpf } = request.params;

  const checkedCPF = CPFs.values.find(value => value.cpf === cpf);

  if (!checkedCPF) {
    return response.status(404).json({ "message": "CPF not found" })
  }

  const newCPFs = CPFs.values.filter(value => value.cpf !== cpf);

  CPFs.values = newCPFs;

  return response.status(204).send();
}