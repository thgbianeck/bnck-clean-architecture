/**
 * Representa um endereço.
 */
export default class Address {
  private _street: string = '';
  private _number: number = 0;
  private _zip: string = '';
  private _city: string = '';

  /**
   * Construtor da classe Address.
   * @param {string} street - Nome da rua.
   * @param {number} number - Número do endereço.
   * @param {string} zip - CEP.
   * @param {string} city - Cidade.
   */
  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;

    this.validate(); // Valida os dados do endereço após a inicialização
  }

  /**
   * Obtém o nome da rua.
   * @returns {string} Nome da rua.
   */
  get street(): string {
    return this._street;
  }

  /**
   * Obtém o número do endereço.
   * @returns {number} Número do endereço.
   */
  get number(): number {
    return this._number;
  }

  /**
   * Obtém o CEP.
   * @returns {string} CEP.
   */
  get zip(): string {
    return this._zip;
  }

  /**
   * Obtém a cidade.
   * @returns {string} Cidade.
   */
  get city(): string {
    return this._city;
  }

  /**
   * Valida os dados do endereço, garantindo que todos os campos obrigatórios sejam preenchidos.
   * Lança um erro se algum campo obrigatório estiver vazio.
   */
  validate() {
    if (this._street.length === 0) {
      throw new Error('Street is required');
    }
    if (this._number === 0) {
      throw new Error('Number is required');
    }
    if (this._zip.length === 0) {
      throw new Error('Zip is required');
    }
    if (this._city.length === 0) {
      throw new Error('City is required');
    }
  }

  /**
   * Retorna uma representação em string do endereço.
   * @returns {string} Representação em string do endereço.
   */
  toString() {
    return `${this._street}, ${this._number}, ${this._zip} ${this._city}`;
  }
}
