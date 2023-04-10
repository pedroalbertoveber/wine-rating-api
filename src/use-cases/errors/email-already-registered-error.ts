export class EmailAlreadyRegisteredError extends Error {
  constructor() {
    super('E-mail has been already registered')
  }
}
