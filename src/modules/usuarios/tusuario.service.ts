import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>
  ) {}

  async findByEmail(email: string): Promise<UsuarioDocument | null> {
    return this.usuarioModel.findOne({ email }).exec();
  }

  async findByGoogleId(googleId: string): Promise<UsuarioDocument | null> {
    return this.usuarioModel.findOne({ googleId }).exec();
  }

  // Agregado: Es necesario para que funcione el authService.getUsuarioProfile
  async findById(id: string): Promise<UsuarioDocument | null> {
    return this.usuarioModel.findById(id).exec();
  }

  async updateTokens(userId: string, tokensToAddOrSubtract: number, nuevoPlan?: string): Promise<UsuarioDocument> {
    const updateData: any = { $inc: { tokens: tokensToAddOrSubtract } };
    if (nuevoPlan) {
      updateData.$set = { plan: nuevoPlan };
    }

    const updatedUser = await this.usuarioModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).exec();

    if (!updatedUser) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return updatedUser;
  }

  async deducirTokensParaAnalisis(userId: string, costo: number): Promise<void> {
    const user = await this.usuarioModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (user.tokens < costo) {
      throw new HttpException('Tokens insuficientes para realizar el análisis', HttpStatus.PAYMENT_REQUIRED);
    }
    
    await this.usuarioModel.findByIdAndUpdate(userId, { $inc: { tokens: -costo } }).exec();
  }

  async reembolsarTokens(userId: string, costo: number): Promise<void> {
    await this.usuarioModel.findByIdAndUpdate(userId, { $inc: { tokens: costo } }).exec();
  }

  findAll() {
    return this.usuarioModel.find().exec();
  }

  findOne(id: string) {
    return this.usuarioModel.findById(id).exec();
  }

  create(data: Partial<Usuario>) {
    const cleanedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key.replace(/:$/, ''), value])
    );
    return new this.usuarioModel(cleanedData).save();
  }

  update(id: string, updateUsuarioDto: any) {
    return this.usuarioModel.findByIdAndUpdate(id, updateUsuarioDto, { new: true }).exec();
  }

  aprobar(id: string, estado: string) {
    return this.usuarioModel.findByIdAndUpdate(id, { estado }, { new: true }).exec();
  }

  remove(id: string) {
    return this.usuarioModel.findByIdAndUpdate(id, { estado: 'Inactivo' }, { new: true }).exec();
  }

  async register(registerDto: RegisterDto) {
    let user: any = await this.usuariosService.findByEmail(registerDto.email);
    
    if (user) {
      if (user.googleId) {
        throw new BadRequestException('Este correo usa Google. Ve a Iniciar Sesión.');
      }
      // Si ya está verificado, no dejamos registrar
      if (user.isVerified || user.isVerified === undefined) { 
        throw new BadRequestException('El correo ya está registrado y verificado. Por favor, inicia sesión.');
      }
      // Si existe pero NO está verificado, sobreescribiremos su OTP más abajo
    }
    
    // Generar OTP de 6 dígitos
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date();
    // El código expira en 10 minutos
    expiry.setMinutes(expiry.getMinutes() + 10); 
    
    const hashedPassword = await bcrypt.hash(registerDto.password || '', 10);
    
    if (user) {
      // Actualizar usuario no verificado existente
      user.password = hashedPassword;
      user.nombres = registerDto.nombres;
      user.otp = otpCode;
      user.otpExpires = expiry;
      await user.save();
    } else {
      // Crear usuario nuevo no verificado
      user = await this.usuariosService.create({
        ...registerDto,
        password: hashedPassword,
        isVerified: false,
        otp: otpCode,
        otpExpires: expiry
      });
    }

    // AQUI ENVIARIAS EL EMAIL REAL (Nodemailer, SendGrid, Resend, etc)
    console.log('\n=============================================');
    console.log(`✉️ SIMULACIÓN DE EMAIL ENVIADO A: ${user.email}`);
    console.log(`🔑 TU CÓDIGO OTP ES: ${otpCode}`);
    console.log('=============================================\n');

    return { message: 'Código enviado al correo', email: user.email };
  }

  async verifyOtp(email: string, otp: string) {
    const user: any = await this.usuariosService.findByEmail(email);
    
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    if (user.isVerified) {
      throw new BadRequestException('La cuenta ya está verificada');
    }
    if (user.otp !== otp) {
      throw new UnauthorizedException('El código OTP es incorrecto');
    }
    if (new Date() > new Date(user.otpExpires)) {
      throw new UnauthorizedException('El código ha expirado. Regístrate de nuevo.');
    }

    // Verificación exitosa
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Ahora sí devolvemos el Token JWT
    return this.generateToken(user);
  }

  async login(loginDto: LoginDto) {
    const user: any = await this.usuariosService.findByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    if (user.googleId && !user.password) {
      throw new UnauthorizedException('Esta cuenta usa Google. Por favor, usa el botón de Google.');
    }
    
    // BLOQUEO: Si no está verificado, no puede loguearse
    if (user.isVerified === false) {
      throw new UnauthorizedException('Tu cuenta no ha sido verificada. Debes completar el registro.');
    }
    
    const isPasswordValid = await bcrypt.compare(loginDto.password || '', user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Credenciales inválidas');
    
    return this.generateToken(user);
  }
}