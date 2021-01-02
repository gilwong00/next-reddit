import { Base, User, Vote } from '.';
import {
  Entity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';

@Entity('posts')
class Post extends Base {
  @Index()
  @Column()
  title: string;

  @Index()
  @Column({ nullable: true })
  body: string;

  @Column()
  username: string;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @OneToMany(() => Vote, vote => vote.post)
  votes: Array<Vote>;
}

export default Post;
