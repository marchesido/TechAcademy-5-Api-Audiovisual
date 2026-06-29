import { Client } from './client.entity';

describe('ClientEntity', () => {
  it('should create a Client entity', () => {
    const client = new Client(
      'Client 1',
      'client@test.com',
      '123456789',
      '12345678912',
      'Company X',
    );

    expect(client).toBeDefined();
    expect(client.name).toBe('Client 1');
    expect(client.company).toBe('Company X');
  });
});
