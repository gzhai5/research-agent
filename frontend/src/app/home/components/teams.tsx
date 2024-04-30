import Image from 'next/image';
import styles from '../styles.module.css';


export default function TeamsSection() {
    return (
        <div className={`flex flex-col gap-6 w-full px-20 py-20 items-center ${styles['radient-bg-bot-fill']}`}>

            {/* title texts */}
            <div className="flex flex-col justify-center items-center">
                <p className="text-center text-[#B4BCD0] text-lg font-normal">Powering global research groups.</p>
                <p className="text-center text-[#F7F8F8] text-lg font-normal">Backed up by top universities.</p>
            </div>

            {/* school logos */}
            <div className="flex w-full h-40 justify-between px-40">
                <Image className="mx-10" priority height={100} width={100} src="/universityLogo/cornell.svg" alt="cornell logo" />
                <Image className="mx-10" priority height={80} width={180} src="/universityLogo/upenn.svg" alt="upenn logo" />
                <Image className="mx-10" priority height={60} width={60} src="/universityLogo/stanford.svg" alt="stanford logo" />
                <Image className="mx-10" priority height={200} width={200} src="/universityLogo/uiuc.svg" alt="uiuc logo" />
            </div>
        </div>
    );
}