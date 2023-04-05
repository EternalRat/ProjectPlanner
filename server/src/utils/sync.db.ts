import {
    getUserModel,
    getRoleModel,
    getUserRoleModel,
    getTodoModel,
    getVerificationModel,
} from '../models';

export default async function syncDB() {
    await getUserModel().sync();
    await getRoleModel().sync();
    await getUserRoleModel().sync();
    await getTodoModel().sync();
    await getVerificationModel().sync();
}
