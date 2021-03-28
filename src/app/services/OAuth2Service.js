
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
            commonAxios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            
            const signedUser = (await commonAxios.get("/accounts")).data;
            
            
            console.log("!@@RT$#%YW#R@ER#T$Y%U^$Y#TR@E!R#T$Y%U^$Y#T@R!R#T$Y%")
            console.log("!@@RT$#%YW#R@ER#T$Y%U^$Y#TR@E!R#T$Y%U^$Y#T@R!R#T$Y%")
            console.log(signedUser)
            console.log("!@@RT$#%YW#R@ER#T$Y%U^$Y#TR@E!R#T$Y%U^$Y#T@R!R#T$Y%")
            console.log("!@@RT$#%YW#R@ER#T$Y%U^$Y#TR@E!R#T$Y%U^$Y#T@R!R#T$Y%")

            const user = signInResult.user; // 임시 (현재 구글만 가능함)
            user.thirdPartyCode = thirdPartyCode;

            Object.defineProperty(this, "currentUser", { writable : false, value: user });
        }catch(e){
            
            console.error("#############################################");
            console.error("#############################################");
            console.log(e)
            console.error("#############################################");
            console.error("#############################################");
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