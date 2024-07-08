import { Sequelize } from 'sequelize-typescript';
import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import FindCustomerUseCase from './find.customer.usecase';

/**
 * Esta função configura um ambiente de teste para o caso de uso de encontrar cliente.
 * Inicializa uma instância do Sequelize com um banco de dados SQLite na memória,
 * cria um repositório de clientes e uma instância do caso de uso de encontrar cliente.
 * Em seguida, cria um cliente de teste, adiciona-o ao banco de dados e testa o caso de uso
 * de encontrar cliente comparando a saída esperada com o resultado real.
 */
describe('Test find customer use case', () => {
  let sequelize: Sequelize;

  /**
   * Configura o ambiente de teste inicializando uma nova instância do Sequelize
   * com um banco de dados SQLite na memória.
   */
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  /**
   * Limpa o ambiente de teste fechando a conexão com o banco de dados.
   */
  afterEach(async () => {
    await sequelize.close();
  });

  /**
   * Testa o caso de uso de encontrar cliente.
   * Cria um cliente de teste, adiciona-o ao banco de dados, executa o caso de uso
   * e verifica se a saída é igual à saída esperada.
   */
  it('deve encontrar um cliente', async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer('123', 'John');
    const address = new Address('Street', 123, 'Zip', 'City');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const input = {
      id: '123',
    };

    const output = {
      id: '123',
      name: 'John',
      address: {
        street: 'Street',
        city: 'City',
        number: 123,
        zip: 'Zip',
      },
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
