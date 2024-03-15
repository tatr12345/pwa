import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  api, CLIENT_ID, CLIENT_SECRET, GRANT_TYPE
} from '@/api/service/endpoints'
import { api_webauthnAuth, api_webauthnAuthOptions } from '@/api/webauthn'
import { useAppDispatch, useAppSelector } from '@/store/_store'
import { asyncDeviceTokenDelete, clearPush } from '@/store/pushSlice'
import { asyncUserAuth, asyncUserInfo, clearUser } from '@/store/userSlice'
import base64url from '../../api/service/base64url-arraybuffer'

/**
 * WebAuthn client.
 *
 * This file is part of asbiin/laravel-webauthn project.
 *
 * @copyright Alexis SAETTLER © 2019
 * @license MIT
 */

'use strict'

/**
 * Create a new instance of WebAuthn.
 *
 * @param {function(string, bool)} notifyCallback
 * @constructor
 */
function WebAuthn(notifyCallback: any = null) {
  if (notifyCallback) {
    // @ts-ignore
    this.setNotify(notifyCallback)
  }
}

/**
 * Register a new key.
 *
 * @param {PublicKeyCredentialCreationOptions} publicKey  - see https://www.w3.org/TR/webauthn/#dictdef-publickeycredentialcreationoptions
 * @param {function(PublicKeyCredential)} callback  User callback
 */
WebAuthn.prototype.register = function(publicKey: any, callback: any) {
  try {
    let publicKeyCredential = Object.assign({}, publicKey)
    publicKeyCredential.user.id = publicKey.user.id
    publicKeyCredential.challenge = this._bufferDecode(this._base64Decode(publicKey.challenge))
    if (publicKey.excludeCredentials) {
      publicKeyCredential.excludeCredentials = this._credentialDecode(publicKey.excludeCredentials)
    }

    console.info({
      publicKey: publicKeyCredential
    }, '{\n'
        + '      publicKey: publicKeyCredential\n'
        + '    } {\n'
        + '      publicKey: publicKeyCredential\n'
        + '    } {\n'
        + '      publicKey: publicKeyCredential\n'
        + '    }')

    let self = this

    // @ts-ignore
    navigator.credentials.create({
      publicKey: publicKeyCredential
    }).then((data) => {
      self._registerCallback(data, callback)
    }, (error) => {
      console.info(error.name, error.message, 'error.name, error.message error.name, error.message error.name, error.message')
      self._notify(error.name, error.message, false)
    })
  } catch (e) {
    console.info(e, 'e e e')
  }

}

/**
 * Register callback on register key.
 *
 * @param {PublicKeyCredential} publicKey @see https://www.w3.org/TR/webauthn/#publickeycredential
 * @param {function(PublicKeyCredential)} callback  User callback
 */
WebAuthn.prototype._registerCallback = function(publicKey: any, callback: any) {
  let publicKeyCredential = {
    id: publicKey.id,
    type: publicKey.type,
    rawId: this._bufferEncode(publicKey.rawId),
    response: {
      /** @see https://www.w3.org/TR/webauthn/#authenticatorattestationresponse */
      clientDataJSON: this._bufferEncode(publicKey.response.clientDataJSON).replace(/=/g, ''),
      attestationObject: this._bufferEncode(publicKey.response.attestationObject)
    }
  }

  callback(publicKeyCredential)
}

/**
 * Authenticate a user.
 *
 * @param {PublicKeyCredentialRequestOptions} publicKey  - see https://www.w3.org/TR/webauthn/#dictdef-publickeycredentialrequestoptions
 * @param {function(PublicKeyCredential)} callback  User callback
 */
WebAuthn.prototype.sign = function(publicKey: any, callback: any) {
  let publicKeyCredential = Object.assign({}, publicKey)
  publicKeyCredential.challenge = this._bufferDecode(this._base64Decode(publicKey.challenge))
  if (publicKey.allowCredentials) {
    publicKeyCredential.allowCredentials = this._credentialDecode(publicKey.allowCredentials)
  }

  let self = this
  navigator.credentials.get({
    publicKey: publicKeyCredential
  }).then((data) => {
    self._signCallback(data, callback)
  }, (error) => {
    self._notify(error.name, error.message, false)
  }
  )
}

/**
 * Sign callback on authenticate.
 *
 * @param {PublicKeyCredential} publicKey @see https://www.w3.org/TR/webauthn/#publickeycredential
 * @param {function(PublicKeyCredential)} callback  User callback
 */
WebAuthn.prototype._signCallback = function(publicKey: any, callback: any) {
  let publicKeyCredential = {
    id: publicKey.id,
    type: publicKey.type,
    rawId: this._bufferEncode(publicKey.rawId),
    response: {
      /** @see https://www.w3.org/TR/webauthn/#iface-authenticatorassertionresponse */
      authenticatorData: this._bufferEncode(publicKey.response.authenticatorData).replace(/=/g, ''),
      clientDataJSON: this._bufferEncode(publicKey.response.clientDataJSON).replace(/=/g, ''),
      signature: this._bufferEncode(publicKey.response.signature),
      userHandle: (publicKey.response.userHandle ? this._bufferEncode(publicKey.response.userHandle) : null),
    }
  }

  callback(publicKeyCredential)
}

/**
 * Buffer encode.
 *
 * @param {ArrayBuffer} value
 * @return {string}
 */
WebAuthn.prototype._bufferEncode = function(value: any) {
  // @ts-ignore
  return window.btoa(String.fromCharCode.apply(null, new Uint8Array(value)))
}

/**
 * Buffer decode.
 *
 * @param {ArrayBuffer} value
 * @return {string}
 */
WebAuthn.prototype._bufferDecode = function(value: any) {
  let t = window.atob(value)
  return Uint8Array.from(t, (c) => c.charCodeAt(0))
}

/**
 * Convert a base64url to a base64 string.
 *
 * @param {string} input
 * @return {string}
 */
// @ts-ignore
WebAuthn.prototype._base64Decode = function(input) {
  // Replace non-url compatible chars with base64 standard chars
  input = input.replace(/-/g, '+').replace(/_/g, '/')

  // Pad out with standard base64 required padding characters
  const pad = input.length % 4
  if (pad) {
    if (pad === 1) {
      throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding')
    }
    input += new Array(5 - pad).join('=')
  }

  return input
}

/**
 * Credential decode.
 *
 * @param {PublicKeyCredentialDescriptor} credentials
 * @return {PublicKeyCredentialDescriptor}
 */
// @ts-ignore
WebAuthn.prototype._credentialDecode = function(credentials: any) {
  let self = this
  return credentials.map((data: any) => {
    return {
      id: self._bufferDecode(self._base64Decode(data.id)),
      type: data.type,
      transports: data.transports,
    }
  })
}

/**
 * Test is WebAuthn is supported by this navigator.
 *
 * @return {bool}
 */
WebAuthn.prototype.webAuthnSupport = function() {
  return ! (window.PublicKeyCredential === undefined ||
      typeof window.PublicKeyCredential !== 'function' ||
      typeof window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable !== 'function')
}

/**
 * Get the message in case WebAuthn is not supported.
 *
 * @return {string}
 */
WebAuthn.prototype.notSupportedMessage = function() {
  if (! window.isSecureContext && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'not_secured'
  }
  return 'not_supported'
}

/**
 * Call the notify callback.
 *
 * @param {string} message
 * @param {bool} isError
 */
// @ts-ignore
WebAuthn.prototype._notify = function(message, isError) {
  if (this._notifyCallback) {
    this._notifyCallback(message, isError)
  }
}

/**
 * Set the notify callback.
 *
 * @param {function(name: string, message: string, isError: bool)} callback
 */
WebAuthn.prototype.setNotify = function(callback: any) {
  this._notifyCallback = callback
}

const PageAuth = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<any>()
  const dispatch = useAppDispatch()
  const { info } = useAppSelector(({ user }) => user)

  function publicKeyCredentialToJSON(pubKeyCred: any): any {
    if (pubKeyCred instanceof Array) {
      let arr = []
      for (let i of pubKeyCred) arr.push(publicKeyCredentialToJSON(i))

      return arr
    }

    else if (pubKeyCred instanceof ArrayBuffer) {
      return base64url.encode(pubKeyCred)
    }

    else if (pubKeyCred instanceof Object) {
      let obj: any = {}

      for (let key in pubKeyCred) {
        obj[key] = publicKeyCredentialToJSON(pubKeyCred[key])
      }

      return obj
    }

    return pubKeyCred
  }

  const onSubmit = async (formData: { email1: string, password: string }) => {

    console.info({ email: formData.email1 }, '{ email: formData.email1 } { email: formData.email1 } { email: formData.email1 }')
    // @ts-ignore
    const temp = await api_webauthnAuthOptions({ email: formData.email1 })
    console.info(temp.data.publicKey, navigator.credentials, 'temp.data.publicKey temp.data.publicKey temp.data.publicKey')
    // @ts-ignore
    let webauthn = new WebAuthn()
    // @ts-ignore
    delete temp.data.publicKey['rpId']

    let publicKey = {
      ...temp.data.publicKey,
      user: {
        id: new Uint8Array([79, 252, 83, 72, 214, 7, 89, 26]),
        name: 'jamiedoe',
        displayName: 'Jamie Doe'
      },
      rp: { id: 'pwa.dterra.ru', name: 'pwa.dterra.ru' },
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }]
    }

    // @ts-ignore
    webauthn.sign(
      publicKey,
      (data: any) => {
        axios.post(api.WEBAUTHN_LOGIN, data)
          .then((response) => {
            if (response.data.callback) { window.location.href = response.data.callback }
          })
      }
    )

    // webauthn.register(
    //   publicKey,
    //   (data: any) => {
    //     console.info(data, '1 1 1')
    //     axios.post(api.WEBAUTHN_LOGIN_AUTH, {
    //       ...data,
    //       name: formData.email1,
    //     })
    //   }
    // )

    //   const aboba = await navigator.credentials.create({ publicKey: {
    //     challenge: new Uint8Array([117, 61, 252, 231, 191, 241]),
    //     rp: { id: 'pwa.dterra.ru', name: 'pwa.dterra.ru' },
    //     user: {
    //       id: new Uint8Array([79, 252, 83, 72, 214, 7, 89, 26]),
    //       name: 'jamiedoe',
    //       displayName: 'Jamie Doe'
    //     },
    //     timeout: 60000,
    //     pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
    //   } }) as PublicKeyCredential
    //   let utf8Decoder = new TextDecoder()
    //
    //   // client data decode
    //
    //   const decodedClientData = utf8Decoder.decode(
    //     aboba?.response?.clientDataJSON)
    //   const clientDataObj = JSON.parse(decodedClientData)
    //   console.info(clientDataObj, 'clientDataObj clientDataObj clientDataObj')
    //
    //   // attestationObject parse
    //   // @ts-ignore
    //   const bufferToBase64 = (buffer: any) => btoa(String.fromCharCode(...new Uint8Array(buffer)))
    //
    //   // @ts-ignore
    //   console.info(publicKeyCredentialToJSON(aboba.response.getAuthenticatorData()), 'aboba.response.getAuthenticatorData() aboba.response.getAuthenticatorData() aboba.response.getAuthenticatorData()')
    //
    //   const authData = publicKeyCredentialToJSON(aboba)
    //   console.info(aboba, publicKeyCredentialToJSON(aboba), authData, 'aboba aboba aboba')
    //   // const keyToBack = await api_webauthnAuth(JSON.stringify(aboba))
    // } catch (e) {
    //   console.info(e, 'ERROR ERROR ERROR')
    // }

    // let response = await fetch(api.WEBAUTHN_LOGIN_OPTIONS, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8'
    //   },
    //   body: JSON.stringify({ email: formData.email })
    // });

    // const resAuth = await dispatch(asyncUserAuth({
    //   client_id: CLIENT_ID,
    //   client_secret: CLIENT_SECRET,
    //   grant_type: GRANT_TYPE,
    //   username: formData.email,
    //   password: formData.password
    // }))
    // if (resAuth.type === 'user/asyncUserAuth/fulfilled') {
    //   await dispatch(asyncUserInfo())
    // }
  }

  const onSubmit1 = async (formData: { email: string, password: string }) => {
    console.info(formData, 'formData formData formData')
    const resAuth = await dispatch(asyncUserAuth({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: GRANT_TYPE,
      username: formData.email,
      password: formData.password
    }))
    if (resAuth.type === 'user/asyncUserAuth/fulfilled') {
      await dispatch(asyncUserInfo())
    }
  }

  const logout = () => {
    dispatch(asyncDeviceTokenDelete({
      app: info!.app.id,
      token: String(window.localStorage.getItem('deviceToken'))
    }))
    window.localStorage.removeItem('auth')
    dispatch(clearPush())
    dispatch(clearUser())
  }

  // useEffect(() => {
  //   (async () => {
  //     const temp = api_webauthnAuth()
  //     console.info(temp, 'temp temp temp')
  //   })()
  // }, [])

  return (!info
    ? <div className='container'>
      <br />
      <div className='row'>
        <div className='col text-center'>
          <form onSubmit={handleSubmit(onSubmit1)}>
            <div>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Email address</label>
                <input {...register('email')} type='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='Enter email' />
                <small id='emailHelp' className='form-text text-muted'>We'll never share your email with anyone else.</small>
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputPassword1'>Password</label>
                <input {...register('password')} type='password' className='form-control' id='exampleInputPassword1' placeholder='Password' />
              </div>
              <br />
              <button type='submit' className='btn btn-primary'>Submit</button>
            </div>
          </form>
        </div>

        <div className='col text-center'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Email address</label>
                <input {...register('email1')} type='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='Enter email' />
                <small id='emailHelp' className='form-text text-muted'>We'll never share your email with anyone else.</small>
              </div>
              {/*<div className="form-group">*/}
              {/*  <label htmlFor="exampleInputPassword1">Password</label>*/}
              {/*  <input {...register('password')} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />*/}
              {/*</div>*/}
              <br />
              <button type='submit' className='btn btn-primary'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    : <div className='container'>
      <br />
      <div className='row text-light text-center'>
        <div className='col-2' />
        <div className='col-8'>
          {`Authorized as ${info.user.name} ${info.user.surname}`}
          <br />
          <button onClick={logout} className='btn btn-primary'>Logout</button>
        </div>
        <div className='col-2' />
      </div>
    </div>
  )
}

export default PageAuth
