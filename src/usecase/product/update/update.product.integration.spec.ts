import { Sequelize } from 'sequelize-typescript';
import Product from '../../../domain/product/entity/product';
import ProductFactory from '../../../domain/product/factory/product.factory';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import UpdateProductUseCase from './update.product.usecase';

const product = ProductFactory.create('a', 'Bola de Futebol', 99.9) as Product;

const input = {
  id: product.id,
  name: 'Bola de Futebol Updated',
  price: 199.9,
};

describe('Unit test for product update use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  it('should update a product', async () => {
    const productRepository = new ProductRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    await productRepository.create(product);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
