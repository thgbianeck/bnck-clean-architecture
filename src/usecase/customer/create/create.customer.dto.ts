/**
 * @typedef {Object} Address
 * @property {string} street - A rua do endereço.
 * @property {number} number - O número do endereço.
 * @property {string} zip - O código postal do endereço.
 * @property {string} city - A cidade do endereço.
 */

/**
 * @typedef {Object} InputCreateCustomerDto
 * @property {string} name - O nome do cliente.
 * @property {Address} address - O endereço do cliente.
 */

/**
 * @typedef {Object} OutputCreateCustomerDto
 * @property {string} id - O identificador único do cliente.
 * @property {string} name - O nome do cliente.
 * @property {Address} address - O endereço do cliente.
 */

/**
 * Interface para criar um cliente.
 * @typedef {InputCreateCustomerDto} InputCreateCustomerDto
 * @property {string} name - O nome do cliente.
 * @property {Address} address - O endereço do cliente.
 */
export interface InputCreateCustomerDto {
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
}

/**
 * Interface de saída ao criar um cliente.
 * @typedef {OutputCreateCustomerDto} OutputCreateCustomerDto
 * @property {string} id - O identificador único do cliente.
 * @property {string} name - O nome do cliente.
 * @property {Address} address - O endereço do cliente.
 */
export interface OutputCreateCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
}
