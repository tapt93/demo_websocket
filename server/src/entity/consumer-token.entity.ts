import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class ConsumerTokens extends BaseEntity {
    @Column({ nullable: false })
    consumerId: number;

    @Column({ nullable: false })
    accessToken: string;

    @Column({ nullable: false })
    refreshToken: string;
}
