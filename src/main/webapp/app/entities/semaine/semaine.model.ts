import { BaseEntity } from './../../shared';

export class Semaine implements BaseEntity {
    constructor(
        public id?: number,
        public lundi?: BaseEntity,
        public mardi?: BaseEntity,
        public mercredi?: BaseEntity,
        public jeudi?: BaseEntity,
        public vendredi?: BaseEntity,
        public samedi?: BaseEntity,
        public dimanche?: BaseEntity,
    ) {
    }
}
