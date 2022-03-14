if (process.env.NODE_ENV !== 'integration') {
  jest.mock('ioredis', () => jest.requireActual('ioredis-mock/jest'));
}

jest.spyOn(process, 'exit').mockImplementation((code) => {
  throw new Error(`Process.exit ${code}`);
});
