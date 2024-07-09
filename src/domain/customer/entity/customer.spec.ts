// Importa o objeto de endereço e a classe Customer necessários para os testes
import Address from '../value-object/address';
import Customer from './customer';

/**
 * Testes unitários para a classe Customer.
 */
describe('Customer unit tests', () => {
  /**
   * Deve lançar um erro quando o ID do cliente é vazio.
   */
  it('should throw error when id is empty', () => {
    // Verifica se criar um cliente com ID vazio lança um erro 'Id is required'
    expect(() => {
      let customer = new Customer('', 'John');
    }).toThrow('Id is required');
  });

  /**
   * Deve lançar um erro quando o nome do cliente é vazio.
   */
  it('should throw error when name is empty', () => {
    // Verifica se criar um cliente com nome vazio lança um erro 'Name is required'
    expect(() => {
      let customer = new Customer('123', '');
    }).toThrow('Name is required');
  });

  /**
   * Deve alterar o nome do cliente com sucesso.
   */
  it('should change name', () => {
    // Arrange: Cria um cliente com nome 'John'
    const customer = new Customer('123', 'John');

    // Act: Altera o nome do cliente para 'Jane'
    customer.changeName('Jane');

    // Assert: Verifica se o nome do cliente foi alterado com sucesso
    expect(customer.name).toBe('Jane');
  });

  /**
   * Deve ativar o cliente com sucesso quando um endereço é fornecido.
   */
  it('should activate customer', () => {
    // Cria um cliente e um endereço associado
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 123, '13330-250', 'São Paulo');
    customer.Address = address; // Define o endereço para o cliente

    // Ativa o cliente e verifica se ele está ativo
    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  /**
   * Deve lançar um erro ao tentar ativar o cliente sem um endereço definido.
   */
  it('should throw error when address is undefined when you activate a customer', () => {
    // Verifica se tentar ativar um cliente sem endereço lança um erro específico
    expect(() => {
      const customer = new Customer('1', 'Customer 1');
      customer.activate();
    }).toThrow('Address is mandatory to activate a customer');
  });

  /**
   * Deve desativar o cliente com sucesso.
   */
  it('should deactivate customer', () => {
    // Cria um cliente e desativa
    const customer = new Customer('1', 'Customer 1');
    customer.deactivate();

    // Verifica se o cliente está desativado
    expect(customer.isActive()).toBe(false);
  });

  /**
   * Deve adicionar pontos de recompensa ao cliente com sucesso.
   */
  it('should add reward points', () => {
    // Cria um cliente e verifica se os pontos de recompensa estão corretos inicialmente
    const customer = new Customer('1', 'Customer 1');
    expect(customer.rewardPoints).toBe(0);

    // Adiciona pontos de recompensa e verifica se foram adicionados corretamente
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    // Adiciona mais pontos de recompensa e verifica o saldo atualizado
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
