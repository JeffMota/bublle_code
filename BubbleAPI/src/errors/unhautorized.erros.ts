export function unauthorizedError() {
  return {
    name: 'UnauthorizedError',
    message: 'You must be signed in to continue',
  };
}

export function invalidCredentialsError(message: string = 'Email or password incorrect') {
  return {
    name: 'InvalidCredentialsError',
    message,
  };
}