import { navigate } from "gatsby"
import React, { Component } from "react"

import { getFirebase } from "../util/firebase"

const { Consumer, Provider } = React.createContext(`firebase`)

class Firebase extends Component {
  state = { firebase: getFirebase() }
  subscriber = undefined

  componentDidMount() {
    this.subscriber = this.state.firebase
      .auth()
      .onAuthStateChanged(this.setUser)
  }

  componentWillUnmount() {
    this.subscriber && this.subscriber()
  }

  setUser = user => {
    this.setState({ user: user })
  }

  verifyEmailSend = user => {
    user
      .sendEmailVerification()
      .then(function () {
        console.log("Email sent.")
      })
      .catch(function (error) {
        console.log(user)
        console.log(error)
      })
  }

  updateProfile = (user, userName = null, profilePic = null) => {
    let profile = {}
    if (userName !== null && userName !== "") {
      profile.displayName = userName
    }
    if (profilePic !== null && profilePic !== "") {
      profile.photoURL = profilePic
    }
    user
      .updateProfile(profile)
      .then(() => {
        console.log("Profile Updated")
        console.log(user)
      })
      .catch(error => {
        console.log(error)
      })
  }

  createMember = (user, userName = null) => {
    const userRef = this.state.firebase.firestore().doc(`member/${user.uid}`)
    const member = this.state.member
      ? this.state.member
      : {
          email: user.email,
          id: user.uid,
          userName: userName,
        }
    this.setState(member)

    userRef
      .get()
      .then(memberSnap => {
        if (memberSnap.exists) {
          console.log("Member with this ID exists:", userRef.id)
          console.log("Member ", memberSnap.data())
        } else {
          userRef
            .set(this.state.member)
            .then(console.log("Member Created: ", member))
            .catch(error => console.log(error))
        }
      })
      .catch(error => console.log(error))
  }

  register = (email, password, username = null) => {
    this.state.firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ user: user.user })
        this.updateProfile(user.user, username)
        this.createUser((user.user, username))
        this.verifyEmailSend(user.user)
      })
      .catch(error => {
        //var errorCode = error.code
        //var errorMessage = error.message
        console.log(error)
        // ..
      })
  }

  verifyEmail = code => {
    console.log(this.state)
    this.state.firebase
      .auth()
      .applyActionCode(code)
      .then(console.log("Verified"))
      .catch(error => console.log(error))
  }

  login = (email, password) => {
    this.state.firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ user: user.user })
      })
      .catch(error => {
        //var errorCode = error.code
        //var errorMessage = error.message
        console.log(error)
        // ..
      })
  }

  logout = () => {
    this.state.firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/")
        console.log("logged out")
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          register: this.register,
          verifyEmail: this.verifyEmail,
          login: this.login,
          logout: this.logout,
          createUser: this.createUser,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

Firebase.Consumer = Consumer
Firebase.Provider = Firebase

export default Firebase
