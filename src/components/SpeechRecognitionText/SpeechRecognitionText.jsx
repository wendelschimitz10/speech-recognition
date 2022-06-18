import React from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";

export const SpeechRecognitionText = () => {
    const commands = [
        {
            command: 'lisa limpar tela',
            callback: ({resetTranscript}) => resetTranscript(),
        },
        {
            command: 'lisa pesquisar sobre * no google',
            callback: (site) => {
                window.open(`https://www.google.com/search?q=${site}`)
            },
        },
        {
            command: 'lisa cor *',
            callback: (cor) => {
                document.body.style.background = cor;
                if(cor === 'Black') document.getElementById('h1-text').style.color = 'white'
                else document.getElementById('h1-text').style.color = 'black'
            }
        }
    ]

    const {
        transcript, 
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({commands})

    if(!browserSupportsSpeechRecognition) return (<span>Seu navegador não é compativel com SpeechRecognition.</span>)

    return (
        <div>
            <button onClick={SpeechRecognition.startListening({continuous: true})}>Começar a gravar</button>
            <button onClick={SpeechRecognition.stopListening}>Parar de gravar</button>
            <button onClick={resetTranscript}>Resetar campos</button>

            <h1 id="h1-text">{transcript}</h1>
        </div>
    )
}