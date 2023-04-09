export class UnauthorizedToRateError extends Error {
  constructor() {
    super('Unauthorized')
  }
}