// Importa o objeto de endereço necessário para a classe Customer
import Address from '../value-object/address';

/**
 * Representa um cliente.
 */
export default class Customer {
  private _id: string;
  private _name: string = '';
  private _address!: Address; // Endereço do cliente, pode ser indefinido inicialmente
  private _active: boolean = false; // Indica se o cliente está ativo ou não
  private _rewardPoints: number = 0; // Pontos de recompensa acumulados pelo cliente

  /**
   * Construtor da classe Customer.
   * @param {string} id - ID único do cliente.
   * @param {string} name - Nome do cliente.
   */
  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate(); // Valida os dados do cliente após a criação
  }

  /**
   * Obtém o ID do cliente.
   * @returns {string} ID do cliente.
   */
  get id(): string {
    return this._id;
  }

  /**
   * Obtém o nome do cliente.
   * @returns {string} Nome do cliente.
   */
  get name(): string {
    return this._name;
  }

  /**
   * Obtém os pontos de recompensa do cliente.
   * @returns {number} Pontos de recompensa acumulados.
   */
  get rewardPoints(): number {
    return this._rewardPoints;
  }

  /**
   * Valida os dados do cliente, garantindo que ID e nome sejam válidos.
   * Lança um erro se o ID ou o nome forem inválidos.
   */
  validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }
    if (this._name.length === 0) {
      throw new Error('Name is required');
    }
  }

  /**
   * Altera o nome do cliente.
   * @param {string} name - Novo nome do cliente.
   */
  changeName(name: string) {
    this._name = name;
    this.validate(); // Valida os dados após a alteração do nome
  }

  /**
   * Obtém o endereço atual do cliente.
   * @returns {Address} Objeto de endereço do cliente.
   */
  get Address(): Address {
    return this._address;
  }

  /**
   * Altera o endereço do cliente.
   * @param {Address} address - Novo endereço do cliente.
   */
  changeAddress(address: Address) {
    this._address = address;
  }

  /**
   * Verifica se o cliente está ativo.
   * @returns {boolean} true se o cliente está ativo, false caso contrário.
   */
  isActive(): boolean {
    return this._active;
  }

  /**
   * Ativa o cliente.
   * Lança um erro se o endereço do cliente não estiver definido.
   */
  activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer');
    }
    this._active = true;
  }

  /**
   * Desativa o cliente.
   */
  deactivate() {
    this._active = false;
  }

  /**
   * Adiciona pontos de recompensa ao saldo atual do cliente.
   * @param {number} points - Pontos de recompensa a serem adicionados.
   */
  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  /**
   * Define o endereço do cliente.
   * @param {Address} address - Novo endereço do cliente.
   */
  set Address(address: Address) {
    this._address = address;
  }
}
