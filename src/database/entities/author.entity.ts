import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Post } from './post.entity';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, post => post.author)
  posts: Promise<Post[]>;
}
