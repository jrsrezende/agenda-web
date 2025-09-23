const baseUrlAgenda = 'http://localhost:8080';
const baseUrlAuthentication = 'http://localhost:8081'

export const environment = {
    apiCategories: baseUrlAgenda + '/api/v1/categories',
    apiTasks: baseUrlAgenda + '/api/v1/tasks',
    apiUsers: baseUrlAuthentication + '/api/v1/users'
};

