import { useConfigApiStore } from '~/store/api/_config';

export default function (
  route: string,
): string {
  const store = useConfigApiStore();

  const currentService = store.services;

  if (!currentService.routes[route])
    throw createError({
      statusCode: 500,
      statusMessage:
        'getRoute: ' + route + ': no such route in service',
    });


  return `${currentService.domain}/${currentService.routes[route]}/`;
}
