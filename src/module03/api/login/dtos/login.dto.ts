import { IsAlphanumeric, IsBoolean, IsNotEmpty, Length } from 'class-validator';

export default class Login {
  @IsAlphanumeric()
  @IsNotEmpty()
  @Length(4, 32)
  username = '';

  @IsNotEmpty()
  @Length(4, 32)
  password = '';

  @IsBoolean()
  rememberMe = false;
}
