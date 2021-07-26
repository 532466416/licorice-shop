import request from './request'

// const BASE = 'http://120.55.193.14:5000'
// export const reqLogin = (username, password) => request(BASE + '/login', {
//     username,
//     password
// }, 'post')

export const reqWhether = (city) => request('https://restapi.amap.com/v3/weather/weatherInfo', {
    key: '622147322c3339b7aeb249754711702b',
    city
}, 'get')

// export const reqCategorys = (parentId) => request(BASE + '/manage/category/list',{parentId})

// export const reqAddCategory = (data) => request(BASE + '/manage/category/add',data,'post')

// export const reqUpdateCategory = ({categoryId,categoryName}) => request(BASE + '/manage/category/update',{categoryId,categoryName},'post')

//由于原接口的服务关闭，被迫转移到该接口
const BASE2 = 'http://159.75.128.32:5000'

//登录相关

export const reqLogin = (username, password) => request(BASE2 + '/api/user/login', {
    name: username,
    password
}, 'post')

export const reqRoles = (id) => request(BASE2 + `/api/role/get/${id}`)

//分类相关 

export const reqCategorys = (parentId) => request(BASE2 + `/api/category/list/${parentId}`)

export const reqAddCategory = (data) => request(BASE2 + '/api/category/add', data, 'post')

export const reqUpdateCategory = (data) => request(BASE2 + '/api/category/update', data, 'put')

//商品相关

export const reqProductList = (data) => request(BASE2 + '/api/products/list', data, 'post')

export const reqSearchProduct = (searchType, searchText, pageNum) => {
    const joinUrl = searchType === 'searchByName' ? '' : `/${searchText}/${pageNum}/8`
    const paramsObj = searchType === 'searchByName' ? {
        name: searchText,
        pageNum,
        pageSize: 8
    } : {}
    return request(BASE2 + `/api/products/${searchType}` + joinUrl, paramsObj)
}

export const reqFindCategory = (id) => request(BASE2 + `/api/category/findCategoryById/${id}`)

export const reqChangeStatus = (id) => request(BASE2 + `/api/products/updateStatus/${id}`, {
    additionalProp1: 0,
    additionalProp2: 0,
    additionalProp3: 0
}, 'put')

export const reqRemovUpload = (filename) => request(BASE2 + `/deleteFile/${filename}`)

export const reqAddOrUpdateProduct = (data) => request(BASE2 + `/api/products/` + (data.id ? `updateProduct/${data.id}` : 'addProduct'), data, data.id ? 'put' : 'post')

//角色相关
export const reqGetRoles = () => request(BASE2 + '/api/role/getRoles')

export const reqAddRole = (roleName) => request(BASE2 + '/api/role/createRoleByName', roleName, 'post')

export const reqUpdateRole = (id, data) => request(BASE2 + `/api/role/updateRole/${id}`, data, 'put')

//用户相关
export const reqGetUsers = () => request(BASE2 + '/api/user/getUsers')

export const reqAddUpdateUser = (user) => request(BASE2 + '/api/user/' + (user.id ? `update/${user.id}` : 'add'), user, user.id ? 'put' : 'post')

export const reqDeleteUser = (id) => request(BASE2 + `/api/user/delete/${id}`, {}, 'delete')