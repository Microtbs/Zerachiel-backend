import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Grave } from 'src/modules/graves/entities/graves.entity';

@Entity()
export class DigitalFlowers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column ({ type: 'varchar', length: 30 })
  type: string;

  @Column ({ type: 'int' })
  duration: number;
  
  @Column ({ type: 'int' })
  user_id: number;
  
  @Column ({ type: 'int' })
  grave_id: number;

  @ManyToOne(() => User, (user) => user.id, {  })
      @JoinColumn ({name : "user_id" })

  user: User;
//eager: true
  @ManyToOne(() => Grave, (grave) => grave.id, {  })
      @JoinColumn ({name : "grave_id" })

  grave: Grave;
}
