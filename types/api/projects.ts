import type { IBaseMaterial } from '~/types/api/base'

export interface IProject extends IBaseMaterial {
	initiative_ids: Array<number>
}
