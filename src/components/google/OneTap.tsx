import React from 'react'
import { useGoogleOneTapLogin } from '@react-oauth/google';


export default function OneTap() {
    return (
        useGoogleOneTapLogin({
            onSuccess: credentialResponse => {
                console.log(credentialResponse);
            },
            onError: () => {
                console.log('Login Failed');
            },
        })
  )
}
