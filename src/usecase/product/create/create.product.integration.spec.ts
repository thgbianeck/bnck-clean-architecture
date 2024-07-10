import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import { InputCreateProductDto } from './create.product.dto';
import CreateProductUseCase from './create.product.usecase';

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Test create product use case', () => {
  let input: InputCreateProductDto;
  let sequelize: Sequelize;

  beforeEach(async () => {
    input = {
      name: 'Bola de Futebol',
      price: 19.99,
    };
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  it('should create a product', async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it('should throw an error when name is missing', async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.name = '';

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      'Name is required'
    );
  });

  it('should throw an error when price is missing', async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.price = undefined;

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      'Price is required'
    );
  });

  it('should throw an error when price is less than zero', async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.price = -1;

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      'Price must be greater than zero'
    );
  });
});
