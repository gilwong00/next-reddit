import { Base, Post } from '.';
import { Entity, Column, BeforeInsert, Index, OneToMany } from 'typeorm';
import { hash, genSaltSync } from 'bcryptjs';

@Entity('users')
class User extends Base {
  @Index()
  @Column({ unique: true })
  username: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Post, post => post.user)
  posts: Array<Post>;

  @BeforeInsert()
  async hashPassword() {
    const salt = genSaltSync(10);
    this.password = await hash(this.password, salt);
  }
}

export default User;
