import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';


const CLIENT_KEY = {
  iosClientId: '768423864259-5qfatkm1krf5gshogpldfa4ik4odves2.apps.googleusercontent.com',
  webClientId: '768423864259-v9lakmtgqmcgep7lvmptqoke85sci84u.apps.googleusercontent.com',
}

/**
  user: {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
  };
  scopes?: string[];
  idToken: string | null;
  serverAuthCode: string | null;
*/

// Android 설정이 아직 안되어있음
const GoogleOAuth2 = {

  siginIn: async () => {
    try {

      GoogleSignin.configure({
        ...CLIENT_KEY,
        offlineAccess: false
      })
      await GoogleSignin.hasPlayServices();

      let signInResult =  await await GoogleSignin.signIn();
      return signInResult; // return userInfo

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
      return Promise.reject(error); // 임시처리
    }
  }

}

export default GoogleOAuth2;


