/**
 * 获取传递给 cookie 使用的对象列表
 * @param {String | Object | Array} cookies cookie
 * @return {{name: String, value: String|Number}[]}
 */
export function getCookieList(cookies) {
    let list = [];

    // 非法的值
    if (!cookies) {
        return list;
    }

    if (typeof cookies === 'string') {
        // 如果是字符串，例如name=value;name2=value2这种
        list = (function (cookiesStr) {
            let arr = cookiesStr.split(';');
            let result = [];

            for (let i = 0; i < arr.length; i++) {
                const item = arr[i].trim();

                // 有可能会多输入一个 ; 导致最后一个有空值 https://github.com/helinjiang/nightmare-handler/issues/19
                if (!item) {
                    continue;
                }

                const cur = item.split('=');

                result.push({
                    name: cur[0],
                    value: cur[1]
                });
            }

            return result;
        })(cookies);
    } else if (!Array.isArray(cookies)) {
        // 如果 cookies 为对象，则将其加入到列表中

        if (cookies.name && cookies.value && (Object.keys(cookies).length === 2)) {
            // 如果已经满足了 <name,value> 格式了，则不用处理，直接追加
            list.push(cookies);
        } else {
            // 如果不满足 <name,value> 格式，则需要额外处理
            Object.keys(cookies).forEach((cookieKey) => {
                list.push({
                    name: cookieKey,
                    value: cookies[cookieKey]
                });
            });
        }

    } else {
        // 如果是列表，则直接复制一份
        list = list.concat(cookies);
    }

    return list;
}