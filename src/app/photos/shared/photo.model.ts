export class Photo {
    constructor(
        public original: string,
        public small: string,
        public medium: string,
        public large: string,
        public title: string,
        public description: string,
        public tags?: string[],
    ) { }
}
