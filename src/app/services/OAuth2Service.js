
import {OAuth2,OAUTH2_THIRD_PARTY} from "./oauth2-service/OAuth2";
const OAuth2Service = {
    oAuth: null,currentUser:null,
    signIn: async (thirdPartyCode) => {
        
        // clear
        this.oAuth = new OAuth2(thirdPartyCode)
        this.currentUser = null;
        
        const signInResult =  await this.oAuth.signIn();


        //todo: pass result to ap server !!
        //const user = await XXXService.passResult();
        const user = signInResult.user; // 임시 (현재 구글만 가능함)
        
        user.thirdPartyCode = thirdPartyCode;

        Object.defineProperty(this, "currentUser", { writable : false, value: user });
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