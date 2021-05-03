import { Base, Post } from '.';
import { Entity, Column, BeforeInsert, Index, OneToMany } from 'typeorm';
import { hash } from 'argon2';

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
    this.password = await hash(this.password);
  }
}

export default User;
