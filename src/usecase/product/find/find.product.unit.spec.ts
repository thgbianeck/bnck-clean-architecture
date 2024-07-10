import Product from '../../../domain/product/entity/product';
import FindProductUseCase from './find.product.usecase';

const product = new Product('123', 'Bola de Futebol', 99.0);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit Test find product use case', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: '123',
    };

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: '123',
      name: 'Bola de Futebol',
      price: 99.0,
    });
  });

  it('should not find a product', async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error('Product not found');
    });
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: '123',
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow('Product not found');
  });
});
