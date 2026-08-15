import { useState } from "react"

const useReceive = () => {
    const [text, setText] = useState('')

    return {
        text, 
        setText
    }
}

export default useReceive
