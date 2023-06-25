import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

jest.mock('@nestjs/jwt', () => ({
  JwtService: jest.fn().mockImplementation(() => ({
    verifyAsync: jest.fn(),
  })),
}));

const context = {
  switchToHttp: () => ({
    getRequest: () => ({}),
  }),
};

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard(new JwtService())).toBeDefined();
  });
});

describe('AuthGuard.canActivate', () => {
  it('should be defined', () => {
    expect(new AuthGuard(new JwtService())).toHaveProperty('canActivate');
  });
  it('should throw UnauthorizedException if no token', async () => {
    const token = '';
    const extractTokenFromHeader = jest.spyOn(
      AuthGuard.prototype as any,
      'extractTokenFromHeader',
    );
    extractTokenFromHeader.mockImplementation(() => token);

    const call = new AuthGuard(new JwtService()).canActivate(
      context as ExecutionContext,
    );
    await expect(call).rejects.toEqual(
      new UnauthorizedException('Missing token'),
    );
  });
  it('should throw UnauthorizedException if token but unverifiable', async () => {
    const token = 'sometoken';
    const extractTokenFromHeader = jest.spyOn(
      AuthGuard.prototype as any,
      'extractTokenFromHeader',
    );
    extractTokenFromHeader.mockImplementation(() => token);
    const jwtService = new JwtService();
    jwtService.verifyAsync = jest.fn().mockRejectedValueOnce(new Error());
    await expect(
      new AuthGuard(jwtService).canActivate(context as ExecutionContext),
    ).rejects.toEqual(new UnauthorizedException('Invalid token'));
  });
});

describe('AuthGuard.extractTokenFromHeader', () => {
  it('should be defined', () => {
    expect(new AuthGuard(new JwtService())).toHaveProperty('extractTokenFromHeader');
  });
  it('should return token', () => {
    const token = 'sometoken';
    const jwtService = new JwtService();
    const request = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    expect((new AuthGuard(jwtService) as any).extractTokenFromHeader(request)).toEqual(token);
  });
  it('should return undefined if not bearer', () => {
    const token = 'sometoken';
    const jwtService = new JwtService();
    const request = {
      headers: {
        authorization: `asdf ${token}`,
      },
    };
    expect((new AuthGuard(jwtService) as any).extractTokenFromHeader(request)).toBeUndefined();
  });
  it('should return undefined if no token', () => {
    const jwtService = new JwtService();
    const request = {
      headers: {
        authorization: '',
      },
    };
    expect((new AuthGuard(jwtService) as any).extractTokenFromHeader(request)).toBeUndefined();
  });
});