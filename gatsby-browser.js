import React from "react"

import Firebase from "./src/components/firebase"

// highlight-start

export const wrapRootElement = ({ element }) => (

  <Firebase.Provider>{element}</Firebase.Provider>

)