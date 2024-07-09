// Importa a fábrica de clientes e o objeto de endereço necessários
import CustomerFactory from './customer.factory';
import Address from '../value-object/address';

/**
 * Testes unitários para a fábrica de clientes.
 */
describe('Customer factory unit test', () => {
  /**
   * Deve criar um cliente sem endereço.
   */
  it('should create a customer', () => {
    // Cria um cliente usando a fábrica apenas com o nome 'John'
    let customer = CustomerFactory.create('John');

    // Verifica se o ID do cliente foi definido
    expect(customer.id).toBeDefined();
    // Verifica se o nome do cliente é 'John'
    expect(customer.name).toBe('John');
    // Verifica se o endereço do cliente é indefinido (não deve ter endereço)
    expect(customer.Address).toBeUndefined();
  });

  /**
   * Deve criar um cliente com um endereço específico.
   */
  it('should create a customer with an address', () => {
    // Cria um objeto de endereço para usar na criação do cliente
    const address = new Address('Street', 1, '13330-250', 'São Paulo');

    // Cria um cliente usando a fábrica com nome 'John' e o endereço criado
    let customer = CustomerFactory.createWithAddress('John', address);

    // Verifica se o ID do cliente foi definido
    expect(customer.id).toBeDefined();
    // Verifica se o nome do cliente é 'John'
    expect(customer.name).toBe('John');
    // Verifica se o endereço do cliente é igual ao endereço fornecido
    expect(customer.Address).toBe(address);
  });
});
