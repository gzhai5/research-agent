import styles from '../../styles.module.css';


export default function GenerateThree() {
    return (
        <div className={`w-full h-screen flex justify-center items-center p-20 bg-[#000212] ${styles['radient-bg-fill']}`}>

            <div className={`flex flex-col gap-8 w-1/2 min-w-[25rem] min-h-[30rem] px-8 py-12 items-center justify-start rounded-lg z-10 ${styles['custom-glass-card']}`}>

                {/* text title */}
                <div className='text-2xl text-center text-white'>Choose your favourite animal</div>
            
            </div>
        </div>
    )
}