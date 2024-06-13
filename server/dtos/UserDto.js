module.exports = class UserDto {
    email
    permissionId
    isActivated
    constructor (model) {
        this.email = model.email
        this.permissionId= model.permissionPermissionId
        this.isActivated= model.isActivated
    }
}