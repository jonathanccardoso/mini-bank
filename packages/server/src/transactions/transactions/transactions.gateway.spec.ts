import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsGateway } from './transactions.gateway';

describe('TransactionsGateway', () => {
  let gateway: TransactionsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsGateway],
    }).compile();

    gateway = module.get<TransactionsGateway>(TransactionsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
