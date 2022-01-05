import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Token) private readonly tokenRepository: Repository<Token>,
  ) {}

  public createToken(userId: string): Promise<Token> {
    const token = this.jwtService.sign(
      {
        userId,
      },
      {
        expiresIn: 30 * 24 * 60 * 60,
      },
    );

    const tokenEntity = this.tokenRepository.create({token, userId});
    return this.tokenRepository.save(tokenEntity);
  }

  public async deleteTokenForUserId(userId: string): Promise<Token> {
    const token = await this.tokenRepository.findOne({userId});
    return this.tokenRepository.remove(token);
  }

  public async decodeToken(token: string) {
    const tokenEntity = await this.tokenRepository.findOne({token});
    let result = null;

    if (tokenEntity) {
      try {
        const tokenData = this.jwtService.decode(tokenEntity.token) as {
          exp: number;
          userId: any;
        };
        if (!tokenData || tokenData.exp <= Math.floor(+new Date() / 1000)) {
          result = null;
        } else {
          result = {
            userId: tokenData.userId,
          };
        }
      } catch (e) {
        result = null;
      }
    }

    return result;
  }
}
