const Mock = require('mockjs')
var arr = [];
for (i = 1; i < 10; i++){
    var obj = {
        name: `张${i}`,
        age: 20+i,
        id: i,
        sex: i => {
            if (i%2 == 0) {
                return '男'
            } else {
                return '女'
            }
        }
    }
    arr.push(obj)
}
// 获取数据
Mock.mock('/user', {status:200, arr:arr,errMsg:'获取失败' })
//增加
let addlist = function (options) {
    let obj = JSON.parse(options.body)
    arr = arr.push(obj)
    return {
        data:arr
    }
}
Mock.mock('/userAdd',addlist)
// 删除
let list = function (options) {
    let rtype = options.type.toLowerCase();
    switch (rtype) {
        case 'get':
            break;
        case 'post':
            let id = parseInt(JSON.parse(options.body))
            arr = arr.filter(val => {
                return val.id != id
            })
            break;
        default:
            break
    }
    return {
        data:arr
    }
}
Mock.mock('/userDel', list)
// 修改
let updatelist = function (options) {
    let obj = JSON.parse(options.body)
    arr = arr.map(item => {
        return item.id == obj.id ?obj:val
    })
    return {
        data:arr
    }
}
Mock.mock('/userUpdate',updatelist)
// 查询
const listSearch = function (options) {
    let name = options.body
    arr = arr.map(item => {
        return item.name = name
    })
    return {
        data:arr
    }
}
Mock.mock('/userSearch',listSearch)