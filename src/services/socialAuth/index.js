import auth from '@react-native-firebase/auth';
import {GOOGLE_CLIENT_ID} from '@env';
import appleAuth from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {showErrorToast} from '../../Components/universal/Toast';
import EncryptedStorage from 'react-native-encrypted-storage';
import {translate} from '../../utility';
import sendRequest from '../axios/AxiosApiRequest';
import {
  PHONE_LINK_API,
  SOCIAL_USER_LINK_API,
  SOCIAL_USER_VERIFY_API,
  WP_OTP_SENT_API,
  WP_OTP_VERIFY_API,
} from '../../utility/apiUrls';

auth().onAuthStateChanged(user => {
  if (user) {
    user.getIdToken().then(async function (idToken) {
      await EncryptedStorage.setItem(
        'SESSION_TOKEN',
        JSON.stringify({
          accessToken: idToken,
        }),
      );
    });
  }
});

export const signInWithPhoneNumber = async phoneNumber => {
  return new Promise((resolve, _reject) => {
    auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        handleAuthError(error);
        _reject(error);
      });
  });
};

export const verifyPhoneNumber = async phoneNumber => {
  return new Promise((resolve, _reject) => {
    auth()
      .verifyPhoneNumber(phoneNumber)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        handleAuthError(error);
        _reject(error);
      });
  });
};

export const createUserWithEmail = (email, pwd) => {
  return new Promise((resolve, _reject) => {
    auth()
      .createUserWithEmailAndPassword(email, pwd)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        handleAuthError(error);
        _reject(error);
      });
  });
};

export const signInWithEmailAndPwd = (email, pwd) => {
  return new Promise((resolve, _reject) => {
    auth()
      .signInWithEmailAndPassword(email, pwd)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        handleAuthError(error);
        _reject(error);
      });
  });
};

export const sendPasswordResetEmail = email => {
  return new Promise((resolve, _reject) => {
    auth()
      .sendPasswordResetEmail(email)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        handleAuthError(error);
      });
  });
};

export const confirmOtp = (authResult, otp) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await authResult.confirm(otp);
      resolve(response);
    } catch (error) {
      handleAuthError(error);
      reject(error);
    }
  });
};

export const googleLogout = async () => {
  try {
    if (GoogleSignin.isSignedIn) {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
  } catch (error) {
    console.error(error);
  }
};

export const checkUserExists = data => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: PHONE_LINK_API,
      method: 'POST',
      data: data,
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        _reject(error);
      });
  });
};

export const googleSignIn = () => {
  GoogleSignin.configure({
    webClientId: GOOGLE_CLIENT_ID,
    offlineAccess: true,
  });
  return new Promise(async (resolve, _reject) => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const data = {
        token: idToken,
        provider: 'google',
        type: 'check_email',
      };
      const res = await checkUserExists(data);
      authSignIn(googleCredential).then(async response => {
        resolve(response);
      });
      if (!res?.data?.is_linked) {
        await EncryptedStorage.setItem(
          'LINKING_DATA',
          JSON.stringify({
            phoneNumber: res?.data?.phone_number,
          }),
        );
      }
    } catch (error) {
      googleLogout();
      _reject(error);
    }
  });
};

export const appleSignIn = () => {
  return new Promise(async (resolve, _reject) => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }

      const {identityToken, nonce, fullName} = appleAuthRequestResponse;
      let fullName_ = '';
      if (fullName.namePrefix) {
        fullName_ = fullName_ + fullName.namePrefix + ' ';
      }
      if (fullName.givenName) {
        fullName_ = fullName_ + fullName.givenName + ' ';
      }
      if (fullName.middleName) {
        fullName_ = fullName_ + fullName.middleName + ' ';
      }
      if (fullName.familyName) {
        fullName_ = fullName_ + fullName.familyName + ' ';
      }
      if (fullName.nameSuffix) {
        fullName_ = fullName_ + fullName.nameSuffix + ' ';
      }
      if (fullName.nickname) {
        fullName_ = fullName.nickname + ' ';
      }

      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );
      const data = {
        token: appleCredential?.token,
        provider: 'apple',
        type: 'check_email',
      };
      const res = await checkUserExists(data);
      authSignIn(appleCredential).then(async response => {
        response = JSON.parse(JSON.stringify(response));
        response.user.displayName = fullName_;
        resolve(response);
      });
      if (!res?.data?.is_linked) {
        await EncryptedStorage.setItem(
          'LINKING_DATA',
          JSON.stringify({phoneNumber: res?.data?.phone_number}),
        );
      }
    } catch (error) {
      _reject(error);
    }
  });
};

const authSignIn = async credential => {
  return new Promise((resolve, _reject) => {
    auth()
      .signInWithCredential(credential)
      .then(response => {
        resolve(response);
      });
  }).catch(_error => {
    handleAuthError(_error);
    // eslint-disable-next-line no-undef
    _reject(_error);
  });
};

export const getRefreshFirebaseToken = () => {
  return new Promise((resolve, _reject) => {
    auth()
      .currentUser.getIdToken(true)
      .then(function (idToken) {
        resolve(idToken);
      })
      .catch(function (error) {
        _reject(error);
      });
  }).catch(_error => {
    handleAuthError(_error);
    // eslint-disable-next-line no-undef
    _reject(_error);
  });
};

export const WhatsAppOtpSentApi = data => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: `${WP_OTP_SENT_API}`,
      method: 'POST',
      data: data,
    })
      .then(async response => {
        resolve(response);
      })
      .catch(error => {
        console.error('Error from OTP sent API : ', error);
        _reject(error);
      });
  });
};

export const WhatsAppOtpVerifyApi = data => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: `${WP_OTP_VERIFY_API}`,
      method: 'POST',
      data: data,
    })
      .then(async response => {
        const customToken = response?.data?.customToken;
        const idToken = response?.data?.tokenData?.idToken;
        if (customToken) {
          await auth().signInWithCustomToken(customToken);
        } else {
          if (idToken) {
            await EncryptedStorage.setItem(
              'SESSION_TOKEN',
              JSON.stringify({
                accessToken: idToken,
              }),
            );
          }
        }
        resolve(response);
      })
      .catch(error => {
        console.error('Error from OTP verify API : ', error);
        _reject(error);
      });
  });
};

export const SocialUserVerifyApi = data => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: `${SOCIAL_USER_VERIFY_API}`,
      method: 'POST',
      data: data,
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.error('Error from social email verify API : ', error);
        _reject(error);
      });
  });
};

export const SocialUserLinkApi = data => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: `${SOCIAL_USER_LINK_API}`,
      method: 'POST',
      data: data,
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.error('Error from social user link API : ', error);
        _reject(error);
      });
  });
};

export const updateDisplayName = (userCredentials, name) => {
  return new Promise(async (resolve, reject) => {
    try {
      var response;
      if (userCredentials) {
        response = await userCredentials.user.updateProfile({
          displayName: name,
        });
      } else {
        response = await auth()?.currentUser?.updateProfile({
          displayName: name,
        });
      }
      resolve(response);
    } catch (error) {
      console.error('updateDisplayName', error);
      handleAuthError(error);
    }
  });
};

export const updatePasswordOnFirebase = (currentPassword, newPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const emailCred = auth.EmailAuthProvider.credential(
        auth().currentUser.email,
        currentPassword,
      );
      auth()
        .currentUser.reauthenticateWithCredential(emailCred)
        .then(() => {
          auth()
            .currentUser.updatePassword(newPassword)
            .then(response => {
              resolve();
            })
            .catch(error => {
              handleAuthError(error);
            });
        })
        .catch(error => {
          handleAuthError(error);
        });
    } catch (error) {
      console.error(error);
      handleAuthError(error);
    }
  });
};

export const signOut = () => {
  return new Promise(async (resolve, reject) => {
    try {
      if (auth().currentUser) {
        const response = await auth().signOut();
        resolve(response);
      } else {
        resolve('logout success');
      }
    } catch (error) {
      console.error(error);
      // reject(error)
      handleAuthError(error);
    }
  });
};

export const deleteFirebaseAccount = () => {
  return new Promise(async (resolve, reject) => {
    try {
      auth()
        .currentUser.delete()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          handleAuthError(error);
        });
    } catch (error) {
      handleAuthError(error);
    }
  });
};

export const handleAuthError = error => {
  var errorMessage = '';
  switch (error.code) {
    case 'auth/missing-phone-number':
      errorMessage = 'Missing Phone Number';
      break;

    case 'auth/invalid-phone-number':
      errorMessage = 'Invalid Phone Number.';
      break;

    case 'auth/quota-exceeded':
      errorMessage = 'SMS quota exceeded.';
      break;

    case 'auth/too-many-requests':
      errorMessage =
        'We have blocked all requests from this device due to unusual activity. Try again later.';
      break;

    case 'auth/invalid-verification-code':
      errorMessage = 'Invalid OTP.';
      break;

    case 'auth/session-expired':
      errorMessage =
        'The sms code has expired. Please re-send the verification code to try again.';
      break;

    case 'auth/code-expired':
      errorMessage = 'OTP has been expired.';
      break;
    case 'auth/no-current-user':
      errorMessage = 'User already signed out';
      break;

    case 'ERROR_EMAIL_ALREADY_IN_USE':
    case 'account-exists-with-different-credential':
    case 'email-already-in-use':
    case 'auth/email-already-in-use':
      errorMessage = 'Account already exists with different credentials';
      break;

    case 'ERROR_WRONG_PASSWORD':
    case 'wrong-password':
    case 'auth/wrong-password':
      errorMessage = error?.message
        ? error?.message.replace('[auth/wrong-password] ', '')
        : 'Wrong email/password combination.';
      break;

    case 'ERROR_USER_NOT_FOUND':
    case 'user-not-found':
    case 'auth/user-not-found':
      errorMessage = 'No user found with this email.';
      break;

    case 'ERROR_USER_DISABLED':
    case 'user-disabled':
    case 'auth/user-disabled':
      errorMessage = 'User is disabled.';
      break;

    case 'ERROR_TOO_MANY_REQUESTS':
    case 'operation-not-allowed':
      errorMessage = 'Too many requests to log into this account.';
      break;

    case 'ERROR_OPERATION_NOT_ALLOWED':
    case 'operation-not-allowed':
      errorMessage = 'Server error, please try again later.';
      break;

    case 'ERROR_INVALID_EMAIL':
    case 'invalid-email':
    case 'auth/invalid-email':
      errorMessage = 'Email address is invalid.';
      break;
    case 'auth/requires-recent-login':
      errorMessage = 'Please login again';
      break;
    default:
      errorMessage = 'Something went wrong';
      break;
  }
  showErrorToast(translate('common.autherror'), errorMessage);
};
