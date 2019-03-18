const storage = {
    get(key,defa = []) {
        if (window.localStorage) {
            return localStorage.getItem(key) ? (Array.isArray(defa) ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key)): defa
        }
    },
    set(key, val) {
        if (window.localStorage) {
            localStorage.setItem(key, val)
        }
    },
    clear(key){
        if (window.localStorage) {
            localStorage.removeItem(key)
        }
    }
}

/** 
 * 播放历史
 * 
 */
const HISTORY_LIST_KEY = '__historyList__'
const HISTORY_LIST_MAX_LEN = 100

// 更新播放历史
export function updateHistoryList(music) {
    let list = storage.get(HISTORY_LIST_KEY)
    const index = list.findIndex(item => {
        return item.id === music.id
    })
    if (index === 0) {
        return list
    }
    if (index > 0) {
        list.splice(index, 1)
    }
    list.unshift(music)
    if (HISTORY_LIST_MAX_LEN && list.length > HISTORY_LIST_MAX_LEN) {
        list.pop()
    }
    storage.set(HISTORY_LIST_KEY, JSON.stringify(list))
    return list
}

// 获取播放历史
export function getHistoryList() {
    return storage.get(HISTORY_LIST_KEY)
}

// 删除一条播放历史
export function removeItemFromHistoryList() {
    // TODO
}

// 清空播放历史
export function clearHistoryList() {
    storage.clear(HISTORY_LIST_KEY)
    return []
}