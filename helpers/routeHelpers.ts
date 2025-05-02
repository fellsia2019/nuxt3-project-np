import type { IDomain } from '~/types/ApiService'

export const domainParser = (domain: IDomain, withoutProtocol = false): string => {
	return (
		(withoutProtocol ? '' : `http${domain.secure ? 's' : ''}://`)
		+ domain.domain
		+ (domain.prefix ? `/${domain.prefix}` : '')
	)
}
