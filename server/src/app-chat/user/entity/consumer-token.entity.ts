import { BaseEntity } from 'src/shared/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ConsumerTokens extends BaseEntity {
    @Column({ nullable: false })
    consumerId: number;

    @Column({ nullable: false })
    accessToken: string;

    @Column({ nullable: false })
    refreshToken: string;
}
