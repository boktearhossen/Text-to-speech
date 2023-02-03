const textarea = document.querySelector('textarea')
const speechBtn = document.querySelector('button')
const voiceList =document.querySelector('select')



// function textToSpeech(text){
//      let utternance = new SpeechSynthesisUtterance(text)
//        speechSynthesis.speak(utternance)
// }
// speechBtn.addEventListener('click', e => {
//     e.preventDefault();
//     if(textarea.value !== ""){
//         textToSpeech(textarea.value)
//     }
// })

let synth = speechSynthesis;
isSpeaking  = true
function voices(){
    for(let voices of synth.getVoices()){

        let selected = voices.name === 'Google US English' ? 'selected' : '';
        let option = ` <option value="${voices.name}" ${selected}>${voices.name} (${voices.lang})</option>`
        voiceList.insertAdjacentHTML('beforeend', option)
    }
}

synth.addEventListener('voiceschanged', voices)


function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text)
    for(let voices of synth.getVoices()){
        if(voices.name === voiceList.value){
            utternance.voice = voices;
        }
    }
    synth.speak(utternance) ;
}



speechBtn.addEventListener('click', e => {
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
           textToSpeech(textarea.value)  
        }
        if(textarea.value.length > 80){
            if(isSpeaking){
                synth.resume()
                isSpeaking = false;
                speechBtn.innerText = "pause Speech";
            }else{
                synth.pause()
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
            setInterval(() => {
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }
            })
           }else{
            speechBtn.innerText = 'Convert To Speech'
        }
     }
})




