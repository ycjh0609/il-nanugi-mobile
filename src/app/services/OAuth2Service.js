
import {OAuth2,OAUTH2_THIRD_PARTY} from "./oauth2-service/OAuth2";
import commonAxios from "../utils/axios/commonAxios";
const OAuth2Service = {
    oAuth: null,currentUser:null,
    signIn: async (thirdPartyCode) => {
    
        try{
            // clear
            this.oAuth = new OAuth2(thirdPartyCode)
            this.currentUser = null;
            
            const signInResult =  await this.oAuth.signIn();


            //todo: pass result to ap server !!
            //const user = await XXXService.passResult();
            
            const res = await commonAxios.post("/login",signInResult);
            
            //set Authorization
            commonAxios.defaults.headers['Authorization'] = `Bearer ${res.data.token}`;    
            const signedUser = (await commonAxios.get("/accounts")).data;
        

            Object.defineProperty(this, "currentUser", { writable : false, value: signedUser });
        }catch(e){
            
            console.error("ERROR#############################################");
            console.error("ERROR#############################################");
            console.log(e)
            console.error("ERROR#############################################");
            console.error("ERROR#############################################");
        }

        return this.currentUser;
    },
    signOut: () => {

    },
    isSignedIn: () => {

    },
    getCurrentUser: () => {
        return this.currentUser;
    },
    clear:()=>{
       
    }

}

export default OAuth2Service;