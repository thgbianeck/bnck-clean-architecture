import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from './find.customer.dto';

/**
 * A classe `FindCustomerUseCase` é responsável por executar o caso de uso de busca de cliente.
 * Ele utiliza um `CustomerRepositoryInterface` para recuperar dados de um cliente pelo seu ID.
 *
 * @remarks
 * O caso de uso recebe um `InputFindCustomerDto` contendo o ID do cliente a ser buscado.
 * Ele retorna uma promessa que resolve para um `OutputFindCustomerDto` contendo os detalhes do cliente.
 * Se o cliente não for encontrado, retorna `null`.
 *
 * @example
 * ```typescript
 * const customerRepository = new CustomerRepository();
 * const findCustomerUseCase = new FindCustomerUseCase(customerRepository);
 * const input: InputFindCustomerDto = { id: 123 };
 * const output = await findCustomerUseCase.execute(input);
 * console.log(output); // Saída: { id: 123, name: 'John Doe', address: { street: '123 Main St', city: 'New York', number: '100', zip: '10001' } }
 * ```
 */
export default class FindCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  /**
   * Executa o caso de uso FindCustomerUseCase para recuperar um cliente pelo seu ID.
   *
   * @param input - Os dados de entrada para a busca de um cliente.
   * @returns Uma promessa que resolve para os dados de saída do caso de uso de busca de cliente.
   *
   * @remarks
   * Essa função utiliza o `CustomerRepositoryInterface` fornecido para encontrar um cliente pelo seu ID.
   * Se o cliente for encontrado, retorna um `OutputFindCustomerDto` contendo os detalhes do cliente.
   * Se o cliente não for encontrado, retorna `null`.
   *
   * @example
   * ```typescript
   * const customerRepository = new CustomerRepository();
   * const findCustomerUseCase = new FindCustomerUseCase(customerRepository);
   * const input: InputFindCustomerDto = { id: 123 };
   * const output = await findCustomerUseCase.execute(input);
   * console.log(output); // Saída: { id: 123, name: 'John Doe', address: { street: '123 Main St', city: 'New York', number: '100', zip: '10001' } }
   * ```
   */
  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepository.find(input.id);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        city: customer.Address.city,
        number: customer.Address.number,
        zip: customer.Address.zip,
      },
    };
  }
}
