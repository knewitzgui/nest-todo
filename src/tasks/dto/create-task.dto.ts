import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Nome deve ser um texto' })
  @MinLength(5, { message: 'O Nome precisa ter no mínimo 5 caracteres' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  readonly title: string;
  @IsString({ message: 'Descrição deve ser um texto' })
  @MinLength(10, { message: 'A descrição precisa ter no mínimo 10 caracteres' })
  @IsNotEmpty({ message: 'Descrição não pode ser vazia' })
  readonly description: string;
}
