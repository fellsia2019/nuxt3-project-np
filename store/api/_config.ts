import { defineStore } from 'pinia';
import { domainParser } from '~/helpers/routeHelpers';
import type { IApiService, IDomain } from '~/types/ApiService';

export const useConfigApiStore = defineStore('configApi', () => {
  const domainMain: IDomain = {
    secure: false,
    domain: '127.0.0.1', // сделать из env
    prefix: 'api/v1',
    port: 8000
  };

  const services = computed<IApiService>(() => ({
    domain: domainParser(domainMain),
    routes: {
      projects: 'project',
    },
  }))

  return {
    services,
  };
});
