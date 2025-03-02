import type { IDomain } from '~/types/ApiService'

export const domainParser = (domain: IDomain, withoutProtocol = false): string => {
	return (
		(withoutProtocol ? '' : `http${domain.secure ? 's' : ''}://`)
		+ domain.domain
		+ (domain.port ? `:${domain.port}` : '')
		+ (domain.prefix ? `/${domain.prefix}` : '')
	)
}
