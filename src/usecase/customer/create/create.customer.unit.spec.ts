// Importa o caso de uso de criação de cliente
import CreateCustomerUseCase from './create.customer.usecase';

// Dados de entrada para os testes
const input = {
  name: 'John',
  address: {
    street: 'Street',
    number: 123,
    zip: 'Zip',
    city: 'City',
  },
};

// Função de mock para o repositório de clientes
const MockRepository = () => {
  return {
    find: jest.fn(), // Mock da função de busca
    findAll: jest.fn(), // Mock da função de busca de todos os clientes
    create: jest.fn(), // Mock da função de criação de cliente
    update: jest.fn(), // Mock da função de atualização de cliente
  };
};

/**
 * Testes unitários para o caso de uso de criação de cliente.
 */
describe('Unit test create customer use case', () => {
  /**
   * Deve criar um cliente com sucesso.
   */
  it('should create a customer', async () => {
    // Cria um repositório de clientes mockado
    const customerRepository = MockRepository();
    // Instancia o caso de uso de criação de cliente com o repositório mockado
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    // Executa o caso de uso com os dados de entrada
    const output = await customerCreateUseCase.execute(input);

    // Verifica se o output corresponde ao esperado
    expect(output).toEqual({
      id: expect.any(String), // Verifica se o ID gerado é uma String
      name: input.name, // Verifica se o nome do cliente é o mesmo do input
      address: {
        street: input.address.street, // Verifica se a rua do endereço é a mesma do input
        number: input.address.number, // Verifica se o número do endereço é o mesmo do input
        zip: input.address.zip, // Verifica se o CEP do endereço é o mesmo do input
        city: input.address.city, // Verifica se a cidade do endereço é a mesma do input
      },
    });
  });

  /**
   * Deve lançar um erro quando o nome está ausente.
   */
  it('should throw an error when name is missing', async () => {
    // Cria um repositório de clientes mockado
    const customerRepository = MockRepository();
    // Instancia o caso de uso de criação de cliente com o repositório mockado
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    // Modifica o input para simular um nome ausente
    input.name = '';

    // Verifica se o caso de uso lança um erro quando o nome está ausente
    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      'Name is required' // Espera que o erro lançado seja 'Name is required'
    );
  });

  /**
   * Deve lançar um erro quando a rua está ausente.
   */
  it('should throw an error when street is missing', async () => {
    // Cria um repositório de clientes mockado
    const customerRepository = MockRepository();
    // Instancia o caso de uso de criação de cliente com o repositório mockado
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    // Modifica o input para simular uma rua ausente
    input.address.street = '';

    // Verifica se o caso de uso lança um erro quando a rua está ausente
    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      'Street is required' // Espera que o erro lançado seja 'Street is required'
    );
  });
});
