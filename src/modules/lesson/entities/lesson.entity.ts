import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LessonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  categoryId: number;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  audioFile: string;

  @Column()
  cloneUrl: string;
}
