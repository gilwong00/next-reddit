import { Base } from '.';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Index
} from 'typeorm';
import { hash, genSaltSync } from 'bcryptjs';

@Entity()
class User extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  username: string;

  @Index()
  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = genSaltSync(10);
    this.password = await hash(this.password, salt);
  }
}

export default User;
