import _ from 'lodash';
const STORE = {};
const STORE_WATCHER = {};

function registerWatcher(key, setState) {
    if (!STORE_WATCHER[key]) {
        STORE_WATCHER[key] = [];
    }
    if (STORE_WATCHER[key].some((watcher) => watcher === setState)) {

    } else {
        STORE_WATCHER[key].push(setState);
    }
}
function deleteWatcher(setter) {
    Object.keys(STORE_WATCHER).forEach((key) => {
        STORE_WATCHER[key] = STORE_WATCHER[key].filter(watcher => watcher !== setter.setState)
    }) 
}
const commonStore = {
    define: (key, value, handler) => {
        if (!key || !value) return;
        let key_ = key + "_";
        if (STORE.hasOwnProperty(key_)) {
            return;
        };
        Object.defineProperty(STORE, key, {
            enumerable: false,
            configurable: true,
            get() {
                if (handler && handler.get) handler.get();
                return this[key_];
            },
            set(newValue) {
                if (handler && handler.set) handler.set(key,newValue,this);
                this[key_] = newValue;
            }
        });
        STORE[key] = value;
    },
    setter: (key, newValue) => {
        if (!STORE.hasOwnProperty(key)) {
            return false;
        }
        else {
            STORE[key] = newValue;
        }
    },
    getter: (key) => {
        return STORE[key+"_"];
    }
}


/**
 * 공통 Store 에서 setState 를 삭제한다 (Component 가 umounted 된 후에는 적절히 삭제하는게 좋음)
 *
 * @param setState {Function} 지우려는 dispatchAction
 * @return void
 * */
const deleteStoreWatcher = (setState) => {
    deleteWatcher(setState);
}
/**
 * 공통 Store 에서 item 을 조회한다 (상태 체크는 하지 않음 const 로 이용해야함)
 *
 * @param key {String}
 * @return value
 * */
const getStoreItem = (key) =>{
    return commonStore.getter(key);
}
/**
 * 공통 Store 에 Key, Value 를 선언한다, (value를 선언하지 않으면 value = null)
 *
 * @param key {String}
 * @param value {any}
 * @param handler {Object} get,set 콜백 메서드 오버라이드
 * @return void
 * */
const defineStoreItem = (key, value,handler) => {
    if (!value) value = null;
    commonStore.define(key, value, handler);
}
/**
 * 공통 Store 에 저장된 key 에 대해 상태관리 시작 
 *
 * @param key 상태관리 하려는 키
 * @param useState {Function} React useState
 * @return [state,setState]
 * */
const useStoreState = (key, useState) => {
    const [state, setState] = useState(commonStore.getter(key));
    registerWatcher(key, setState);
    const setter = (newValue) => {
        commonStore.setter(key, newValue);
        STORE_WATCHER[key].forEach((watcher) => {
            watcher(newValue);
        })
    }
    setter.setState = setState;
    return [state, setter];
}


export { defineStoreItem, useStoreState, deleteStoreWatcher,getStoreItem };
