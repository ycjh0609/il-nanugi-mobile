import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import commonAxios from "../utils/axios/commonAxios";

const OAuthService = {

  registConfigure: () => {

    GoogleSignin.configure({
      iosClientId: '768423864259-5qfatkm1krf5gshogpldfa4ik4odves2.apps.googleusercontent.com',
      webClientId: '768423864259-5qfatkm1krf5gshogpldfa4ik4odves2.apps.googleusercontent.com',
      offlineAccess: false
    })
    //com.googleusercontent.apps.768423864259-5qfatkm1krf5gshogpldfa4ik4odves2
    //768423864259-v9lakmtgqmcgep7lvmptqoke85sci84u.apps.googleusercontent.com
    //768423864259-5qfatkm1krf5gshogpldfa4ik4odves2.apps.googleusercontent.com
  }
  , siginIn: async () => {
    try {


      let temp = await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();


      console.log(userInfo);

      let aa = await commonAxios.post("http://localhost:8080/loginSuccess",userInfo)
      

      console.log(aa);


    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

}

export default OAuthService;


