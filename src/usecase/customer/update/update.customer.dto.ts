/**
 * @interface InputUpdateCustomerDto
 * @description Interface para os dados de entrada para atualização de cliente.
 */
export interface InputUpdateCustomerDto {
  id: string /** ID do cliente a ser atualizado */;
  name: string /** Novo nome do cliente */;
  address: {
    street: string /** Nova rua do endereço */;
    number: number /** Novo número do endereço */;
    zip: string /** Novo CEP do endereço */;
    city: string /** Nova cidade do endereço */;
  };
}

/**
 * @interface OutputUpdateCustomerDto
 * @description Interface para os dados de saída após atualização de cliente.
 */
export interface OutputUpdateCustomerDto {
  id: string /** ID do cliente atualizado */;
  name: string /** Nome atualizado do cliente */;
  address: {
    street: string /** Rua atualizada do endereço */;
    number: number /** Número atualizado do endereço */;
    zip: string /** CEP atualizado do endereço */;
    city: string /** Cidade atualizada do endereço */;
  };
}
