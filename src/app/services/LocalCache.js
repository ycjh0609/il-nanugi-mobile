

/**
 * Device storage (물리 저장소 사용) 사용으로 변경 필요!
 */

const TIME_OUT = 60; //1분

const LocalCache = {

    storage:{

    }
    ,find(URL,uuid){
        if (!this.storage.hasOwnProperty(URL)) return false;
        let cache = this.storage[URL];
        if (Date.now() - cache.updatedDate){ // timeout!
            return false;
        }else if (uuid != cache.uuid){ // modified!
            return false;
        }
        return cache.data;
    }
    ,save(data,URL){
        let uuid = createUUID();
        if (!this.storage.hasOwnProperty(URL)){
            this.storage[URL] = {
                data,
                uuid,
                createdDate:Date.now(),
                updatedDate:Date.now(),
            }
        }else{
            let cache = this.storage[URL]
            cache.data = data;
            cache.updatedDate = Date.now();
            cache.uuid = uuid;
        }
        
        return uuid;
    }

}


function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }




export default LocalCache;