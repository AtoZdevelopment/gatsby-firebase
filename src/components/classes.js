import React, { useState, useEffect } from "react"
import app from "firebase/app"
import Firebase from "./firebase"

const Classes = props => {
  return (
    <Firebase.Consumer>
      {firebase => <ProfileInner {...firebase} {...props} />}
    </Firebase.Consumer>
  )
}

const ProfileInner = ({ firebase, user }) => {
  const [member, setMember] = useState({})
  const [classes, setClasses] = useState([])
  const [formClassType, setFormClassType] = useState("")
  const [formClassId, setFormClassId] = useState("")
  const [bookedBy, setBookedBy] = useState([])
  // subscribe to member
  useEffect(() => {
    const unsubscribe =
      (firebase
        .firestore()
        .doc(`member/${user.uid}`)
        .onSnapshot(memberSnapshot => {
          setMember(memberSnapshot.exists ? memberSnapshot.data() : {})
        }),
      error => {
        console.log(error)
      })
    return unsubscribe()
  }, [])

  // subscribe to classe
  useEffect(() => {
    const unsubscribe =
      (firebase
        .firestore()
        .collection(`classes`)
        .onSnapshot(classesSnapshot => {
          setClasses(classesSnapshot.docs ? classesSnapshot.docs : [])
        }),
      error => {
        console.log(error)
      })
    return unsubscribe()
  }, [])

  const addClass = (formClassId, formClassType) => {
    firebase.firestore().collection(`classes`).add({
      classId: formClassId,
      classType: formClassType,
    })
  }

  const book = id => {
    console.log("book: ", id)
    firebase
      .firestore()
      .collection("member")
      .doc(user.uid)
      .update({
        bookedClasses: app.firestore.FieldValue.arrayUnion(id),
      })
  }

  const chancel = id => {
    console.log("chancel: ", id)
    firebase
      .firestore()
      .collection("member")
      .doc(user.uid)
      .update({
        bookedClasses: app.firestore.FieldValue.arrayRemove(id),
      })
  }

  const staticClasses = [
    { classId: 1, classStart: 1800, classEnd: 1900, classType: "BJJ" },
    { classId: 2, classStart: 1800, classEnd: 1900, classType: "MMA" },
    { classId: 3, classStart: 2000, classEnd: 2100, classType: "Yoga" },
    { classId: 4, classStart: 1800, classEnd: 1900, classType: "BJJ" },
  ]

  return (
    <>
      <h1>Your profile</h1>
      <ul>
        <p>username: {member.userName ? member.userName : undefined}</p>
        <p>mail: {member.email ? member.email : undefined}</p>
        <p>verified: {member.emailVerified ? "yes" : "no"}</p>
      </ul>
      <h2>Static Classes:</h2>
      <ul>
        {staticClasses.map(({ classId, classType }) => (
          <ul key={classId}>
            <p>classID: {classId}</p>
            <p>classType: {classType}</p>
          </ul>
        ))}
      </ul>
      <h2>Firebase Classes:</h2>
      <ul>
        {classes.map(c => {
          const { classId, classType } = c.data()
          const booked =
            member.bookedClasses && member.bookedClasses.includes(c.id)
          return (
            <div key={c.id}>
              <p>firebaseID: {c.id}</p>
              <ul>
                <p>booked: {booked ? "yes" : "no"}</p>
                <p>classType: {classType}</p>

                {booked ? (
                  <button onClick={() => chancel(c.id)}>Stornieren</button>
                ) : (
                  <button onClick={() => book(c.id)}>Buchen</button>
                )}
              </ul>
            </div>
          )
        })}
      </ul>
      <h2>Create Class:</h2>
      <form
        onSubmit={event => {
          event.preventDefault()
          addClass(formClassId, formClassType)
        }}
      >
        <label>
          ClassId
          <input
            type="text"
            name="ClassID"
            onChange={e => setFormClassId(e.target.value)}
          />
        </label>
        <label>
          ClassType
          <input
            type="text"
            name="ClassType"
            onChange={e => setFormClassType(e.target.value)}
          />
        </label>
        <input type="submit" value="Save" />
      </form>
      <h2>Classes booked by users</h2>
      <ul>
        {classes.map(c => (
          <ClassesAndBookers c={c} firebase={firebase} />
        ))}
      </ul>
    </>
  )
}

const ClassesAndBookers = ({ firebase, c }) => {
  const [bookedBy, setBookedBy] = useState([])
  const { classId, classType } = c.data()
  const idiots = ["idi1", "idi2", "idi3"]
  firebase
    .firestore()
    .collection("member")
    .where("bookedClasses", "array-contains", c.id)
    .get()
    .then(allUsers => {
      let bla = []
      allUsers.docs.map(booker => {
        console.log(bla)
        // bookedBy.push &&
        //   setBookedBy(bookedBy.push(booker.data().userName))
        console.log(bla.push(booker.data().userName))
      })
      setBookedBy(bla)
    })
  return (
    <ul key={c.id}>
      <p>ClassID: {classId}</p>
      <p>booked by:</p>
      <ul>
        {bookedBy.map(booker => (
          <p>{booker}</p>
        ))}
      </ul>
    </ul>
  )
}

export default Classes
