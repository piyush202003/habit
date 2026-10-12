import { useEffect, useRef, useState } from "react";
import api from "../api/axios";

const SAMPLES = [
  "Which day of the week am I most consistent?",
  "What is my best performing category?",
  "Why do I keep failing my exercise habit?",
];

export default function AIChat(){
    const [ open, setOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            role:'assistant',
            content: 'Hi — ask me anything about your habit data. Try one of the examples below.'
        },
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const scrollRef = useRef(null)

    useEffect(()=>{
        scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight)
    },[messages, open])

    const send = async (text) =>{
        const q = (text ?? input).trim()
        if(!q || loading) return
        setInput('')
        setMessages((m)=>[...m,{role:'user', content:q}])
        setLoading(true)
        try {
            const res = await api.post('/ai/chat', {question:q})
            setMessages((m)=>[
                ...m, {role:'assistant', content:res.data.content}
            ])
        } catch {
            setMessages((m)=>[
                ...m, {role:'assistant', content:"Sorry, I couldn't answer that right now." }
            ])
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            
        </>
    )
}