import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string; 

  @Column()
  path: string; 

  @Column()
  mimetype: string; 

  @Column()
  size: number; 

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  user: User;
}