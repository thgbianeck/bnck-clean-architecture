import Product from '../../../domain/product/entity/product';
import ProductFactory from '../../../domain/product/factory/product.factory';
import UpdateProductUseCase from './update.product.usecase';

const product = ProductFactory.create('a', 'Bola de Futebol', 99.9) as Product;

const input = {
  id: product.id,
  name: 'Bola de Futebol Updated',
  price: 199.9,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe('Unit test for product update use case', () => {
  it('should update a product', async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
