import { IAuthService } from '../../domain/services/IAuthService';

export class AuthUseCases {
  constructor(private authService: IAuthService) {}

  async register(
    name: string,
    email: string,
    password: string,
    profile: string
  ): Promise<void> {
    await this.authService.register(name, email, password, profile);
  }

  async login(email: string, password: string): Promise<string> {
    return await this.authService.login(email, password);
  }
}
