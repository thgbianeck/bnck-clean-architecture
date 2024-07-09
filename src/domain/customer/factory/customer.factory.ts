// Importa a entidade Customer, uuid e Address necessários
import Customer from '../entity/customer';
import { v4 as uuid } from 'uuid';
import Address from '../value-object/address';

/**
 * Fábrica para criação de instâncias da entidade Customer.
 */
export default class CustomerFactory {
  /**
   * Cria um novo cliente apenas com nome.
   * @param {string} name - Nome do cliente.
   * @returns {Customer} Instância do cliente criado.
   */
  public static create(name: string): Customer {
    // Cria um novo cliente com um ID gerado aleatoriamente e o nome fornecido
    return new Customer(uuid(), name);
  }

  /**
   * Cria um novo cliente com nome e endereço.
   * @param {string} name - Nome do cliente.
   * @param {Address} address - Objeto de endereço do cliente.
   * @returns {Customer} Instância do cliente criado com endereço.
   */
  public static createWithAddress(name: string, address: Address): Customer {
    // Cria um novo cliente com um ID gerado aleatoriamente e o nome fornecido
    const customer = new Customer(uuid(), name);
    // Define o endereço do cliente usando o objeto Address fornecido
    customer.changeAddress(address);
    return customer;
  }
}
