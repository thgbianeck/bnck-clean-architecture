import express, { Request, Response } from 'express';
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase';
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';

export const customerRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Gerenciamento de clientes
 */

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do cliente
 *                 example: John Doe
 *               address:
 *                 type: object
 *                 required:
 *                   - street
 *                   - city
 *                   - number
 *                   - zip
 *                 properties:
 *                   street:
 *                     type: string
 *                     description: Rua do endereço do cliente
 *                     example: Rua Exemplo
 *                   city:
 *                     type: string
 *                     description: Cidade do endereço do cliente
 *                     example: Cidade Exemplo
 *                   number:
 *                     type: string
 *                     description: Número do endereço do cliente
 *                     example: 123
 *                   zip:
 *                     type: string
 *                     description: CEP do endereço do cliente
 *                     example: 12345-678
 *     responses:
 *       200:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do cliente
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Nome do cliente
 *                   example: John Doe
 *                 address:
 *                   type: object
 *                   properties:
 *                     street:
 *                       type: string
 *                       description: Rua do endereço do cliente
 *                       example: Rua Exemplo
 *                     city:
 *                       type: string
 *                       description: Cidade do endereço do cliente
 *                       example: Cidade Exemplo
 *                     number:
 *                       type: string
 *                       description: Número do endereço do cliente
 *                       example: 123
 *                     zip:
 *                       type: string
 *                       description: CEP do endereço do cliente
 *                       example: 12345-678
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * Cria um novo cliente.
 *
 * @param {Request} req - Objeto de requisição do Express.
 * @param {Response} res - Objeto de resposta do Express.
 */
customerRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    };
    const output = await usecase.execute(customerDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID do cliente
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Nome do cliente
 *                     example: John Doe
 *                   address:
 *                     type: object
 *                     properties:
 *                       street:
 *                         type: string
 *                         description: Rua do endereço do cliente
 *                         example: Rua Exemplo
 *                       city:
 *                         type: string
 *                         description: Cidade do endereço do cliente
 *                         example: Cidade Exemplo
 *                       number:
 *                         type: string
 *                         description: Número do endereço do cliente
 *                         example: 123
 *                       zip:
 *                         type: string
 *                         description: CEP do endereço do cliente
 *                         example: 12345-678
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * Lista todos os clientes.
 *
 * @param {Request} req - Objeto de requisição do Express.
 * @param {Response} res - Objeto de resposta do Express.
 */
customerRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());
  const output = await usecase.execute({});

  res.format({
    json: async () => res.send(output),
  });
});
