import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private usuariosService;
    private jwtService;
    constructor(usuariosService: UsuariosService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        email: any;
    }>;
    verifyOtp(email: string, otp: string): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            nombres: any;
            tokens: any;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            nombres: any;
            tokens: any;
        };
    }>;
    validateOAuthLogin(profile: any): Promise<any>;
    generateToken(user: any): {
        access_token: string;
        user: {
            id: any;
            email: any;
            nombres: any;
            tokens: any;
        };
    };
    getUsuarioProfile(userId: string): Promise<{
        id: any;
        email: string;
        nombres: string;
        tokens: number;
        plan: string;
    }>;
}
