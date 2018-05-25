import { BaseEntity } from './../../shared';

export class Jour implements BaseEntity {
    constructor(
        public id?: number,
        public petitDejeuner?: BaseEntity,
        public recetteEntreeMidi?: BaseEntity,
        public recettePlatMidi?: BaseEntity,
        public recetteEntreeSoir?: BaseEntity,
        public recettePlatSoir?: BaseEntity,
    ) {
    }
}
