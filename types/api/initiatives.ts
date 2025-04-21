import type { IBaseMaterial } from '~/types/api/base'

export interface IInitiative extends IBaseMaterial {
	article_ids: Array<number>
}
