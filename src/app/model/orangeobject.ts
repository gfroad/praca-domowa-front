export interface OrangeObject {
    id: number;
    name: string;
    description: string;
    type: ObcjecType;
    size: bigint;
}

enum ObcjecType {
    TYPE1, TYPE2
}