import { useState } from "react"

const useSend = () => {
    const [text, setText] = useState('')

    return {
        text, 
        setText
    }
}

export default useSend
