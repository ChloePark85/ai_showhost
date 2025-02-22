import { useState } from 'react';
import Image from 'next/image';

type Profile = {
    name: string;
    src: string;
}

export default function ProfileImageSelector() {
    const profiles: Profile[] = [
        {
            name: 'Luna',
            src: '/images/profiles/ag1_Luna.png',
        },
        {
            name: 'Jenny',
            src: '/images/profiles/ag2_Jenny.png',
        },
        {
            name: 'Jin',
            src: '/images/profiles/ag3_Jin.png',
        },
        {
            name: 'Mia',
            src: '/images/profiles/ag4_Mia.png',
        },
        {
            name: 'Sean',
            src: '/images/profiles/ag5_Sean.png',
        },
        {
            name: 'CUSTOM',
            src: 'CUSTOM',
        }
    ] as Profile[];
    // const profileImages = [
    //     '/images/profiles/profile1.png',
    //     '/images/profiles/profile1.png',
    //     '/images/profiles/profile1.png',
    //     '/images/profiles/profile1.png',
    //     '/images/profiles/profile1.png',
    // ];

    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="">
            <div className="overflow-x-scroll">
                <div className="flex gap-4">
                    {profiles.map((profile, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer p-2 transition-all duration-300 ${selectedImage === index
                                ? 'rounded-full bg-gray-300'
                                : ''
                                }`}
                            onClick={() => setSelectedImage(index)}
                        >
                            <div className='flex flex-col items-center'>
                                <div className="w-24 h-24 rounded-full">
                                    {profile.name === "CUSTOM" ? (
                                        <div className='w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center'>
                                            <div className='text-2xl font-bold'>+</div>
                                        </div>
                                    ) : (
                                        <Image
                                            src={profile.src}
                                            alt={`Profile ${index + 1}`}
                                            width={96}
                                            height={96}
                                            className="w-24 h-24 object-cover rounded-full"
                                        />
                                    )}

                                </div>

                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
