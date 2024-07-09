import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import FindCustomerUseCase from './find.customer.usecase';

const customer = new Customer('123', 'John');
const address = new Address('Street', 123, 'Zip', 'City');
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit Test find customer use case', () => {
  it('deve encontrar um cliente', async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

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

  it('não deve encontrar um cliente', async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error('Cliente não encontrado');
    });
    const usecase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: '123',
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow('Cliente não encontrado');
  });
});
