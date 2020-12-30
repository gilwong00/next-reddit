import { Base } from '.';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Index
} from 'typeorm';
import { hash, genSaltSync } from 'bcryptjs';

@Entity('users')
class User extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  username: string;

  @Index()
  @Column({ unique: true })
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
