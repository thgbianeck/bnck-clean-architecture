import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from './create.customer.dto';
import { v4 as uuid } from 'uuid';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';

/**
 * Caso de uso para criar um novo cliente.
 */
export default class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  /**
   * Construtor do caso de uso.
   * @param {CustomerRepositoryInterface} customerRepository - Repositório de clientes.
   */
  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  /**
   * Executa o caso de uso para criar um novo cliente.
   * @param {InputCreateCustomerDto} input - Dados de entrada para criar o cliente.
   * @returns {Promise<OutputCreateCustomerDto>} Retorna os dados do cliente criado.
   */
  async execute(
    input: InputCreateCustomerDto
  ): Promise<OutputCreateCustomerDto> {
    // Cria um novo cliente usando a fábrica de clientes e endereço fornecidos
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    );

    // Salva o cliente no repositório
    await this.customerRepository.create(customer);

    // Retorna os dados do cliente criado, incluindo o ID gerado e o endereço
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        zip: customer.Address.zip,
        city: customer.Address.city,
      },
    };
  }
}
