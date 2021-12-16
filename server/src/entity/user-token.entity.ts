import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class UserTokens extends BaseEntity {
    @Column({ nullable: false })
    userId: number;

    @Column({ nullable: false })
    accessToken: string;

    @Column({ nullable: false })
    refreshToken: string;
}
