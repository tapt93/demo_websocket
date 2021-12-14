import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Users extends BaseEntity {
  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  userName: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({unique: true})
  mobilePhone: string;

  @Column({ default: 2 })
  roleId: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({ nullable: true, default: 0 })
  parentUserId: number;

  @Column({ nullable: true })
  status: number;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  zipcode?: string;

  @Column({ nullable: true })
  wardId?: number;

  @Column({ nullable: true })
  districtId?: number;

  @Column({ nullable: true })
  cityId?: number;

  @Column({ nullable: true })
  countryId?: number;

  @Column({ nullable: true, default: 0 })
  migrationId?: number;
}
