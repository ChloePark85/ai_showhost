'use client'
import { useState } from "react";

export default function VoiceSelector() {
    const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
    const voices = [
        {
            name: 'Jessica',
            descriptions: ['Conversational', 'American', 'Expressive']
        },
        {
            name: 'Matilda',
            descriptions: ['Narration', 'Friendly', 'Middle-aged']
        },
        {
            name: 'Laura',
            descriptions: ['Social media', 'Upbeat', 'Young']
        },
        {
            name: 'Callum',
            descriptions: ['Transatlantic', 'Intense', 'Middle-aged']
        },
        {
            name: 'Will',
            descriptions: ['Social Media', 'Friendly', 'Young']
        },
        {
            name: 'CUSTOM',
            descriptions: ['Custom', 'Custom', 'Custom']
        }
    ]
    return (
        <div>
            <div className="flex flex-col gap-4">
                {voices.map((voice) => {
                    if (voice.name === 'CUSTOM') {
                        return (
                            <div key={voice.name} className={`flex flex-col gap-2 border rounded p-2 cursor-pointer justify-center items-center ${selectedVoice === voice.name ? 'bg-gray-300' : ''}`}
                                onClick={() => setSelectedVoice(voice.name)}
                            >
                                <div><b>+</b></div>
                            </div>
                        )
                    }
                    return (
                        <div key={voice.name} className={`flex flex-col gap-2 border rounded p-2 cursor-pointer ${selectedVoice === voice.name ? 'bg-gray-300' : ''}`}
                            onClick={() => setSelectedVoice(voice.name)}
                        >
                            <div><b>{voice.name}</b></div>
                            <div className="flex gap-2">
                                {voice.descriptions.map((description, index) => {
                                    return (
                                        <span className="badge" key={index} >{description}</span>

                                    )
                                })}
                            </div>
                        </div>)
                })}
            </div>

        </div>
    );
}