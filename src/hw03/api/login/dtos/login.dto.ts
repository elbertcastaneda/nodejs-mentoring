import { IsAlphanumeric, IsBoolean, IsNotEmpty, Length } from 'class-validator';

export default class LoginDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  @Length(4, 32)
  username = '';

  @IsNotEmpty()
  @Length(6, 32)
  password = '';

  @IsBoolean()
  rememberMe = false;
}
