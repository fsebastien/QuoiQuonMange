import { BaseEntity } from './../../shared';

export class Recette implements BaseEntity {
    constructor(
        public id?: number,
        public intitule?: string,
        public description?: string,
    ) {
    }
}
