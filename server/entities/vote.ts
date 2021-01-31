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

  @Column({ type: 'int' })
  postId: number;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: Post;

  // add a many to one for comments
}

export default Vote;
