import { Base, Post, User } from '.';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('votes')
class Vote extends Base {
  @Column()
  value: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @Column()
  username: string;

  @ManyToOne(() => Post)
  post: Post;

  // add a many to one for commets
}

export default Vote;
