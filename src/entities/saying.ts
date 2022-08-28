export type Identity = string;

export interface SayingEssential {
	_id: Identity;
	saying: string;
	author: string;
	topic: string;
}

export interface SayingEntity extends SayingEssential {
	createdDate: Date;
	modifiedDate: Date;
}
