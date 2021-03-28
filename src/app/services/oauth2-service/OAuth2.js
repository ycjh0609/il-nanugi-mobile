import FaceBookOAuth2 from "./FaceBook";
import GoogleOAuth2 from "./GoogleOAuth2";
import KakaoOAuth2 from "./KakaoOAuth2";
import NaverOAuth2 from "./NaverOAuth2";

const OAUTH2_THIRD_PARTY = {
    Naver: 0,
    Google: 1,
    FaceBook: 2,
    Kakao: 3,
}
class OAuth2{

    constructor(thirdPartyCode){

        switch (thirdPartyCode) {
            case OAUTH2_THIRD_PARTY.Naver:
                this.service =  NaverOAuth2;
                break;
            case OAUTH2_THIRD_PARTY.Google:
                this.service =  GoogleOAuth2;
                break;
            case OAUTH2_THIRD_PARTY.FaceBook:
                this.service =  FaceBookOAuth2;
                break;
            case OAUTH2_THIRD_PARTY.Kakao:
                this.service =  KakaoOAuth2;
                break;
            default: throw new Error("UnSupported ThirdParty");
        }
    }
    async signIn(){
        return this.service.siginIn();
    }
}

export {OAuth2,OAUTH2_THIRD_PARTY};