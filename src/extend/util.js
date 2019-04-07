/**
 * 获取传递给 cookie 使用的对象列表
 * @param {String | Object | Array} cookies cookie
 * @return {{name: String, value: String|Number}[]}
 */
export function getCookieList(cookies) {
    let list = [];

    if (typeof cookies === 'string') {
        // 如果是字符串，例如name=value;name2=value2这种
        list = (function (cookiesStr) {
            let arr = cookiesStr.split(';');
            let result = [];

            for (let i = 0; i < arr.length; i++) {
                let cur = arr[i].trim().split('=');

                result.push({
                    name: cur[0],
                    value: cur[1]
                });
            }

            return result;
        })(cookies);
    } else if (!Array.isArray(cookies)) {
        // 如果 cookies 为对象，则将其加入到列表中
        list.push(cookies);
    } else {
        // 如果是列表，则直接复制一份
        list = list.concat(cookies);
    }

    return list;
}