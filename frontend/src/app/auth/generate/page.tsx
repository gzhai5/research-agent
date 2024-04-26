import styles from '../styles.module.css';


export default function Generate() {
    return (
        <div className={`w-full h-screen flex justify-center items-center p-20 bg-[#000212] ${styles['radient-bg-fill']}`}>

            <div className={`flex flex-col gap-4 h-3/4 w-1/3 min-w-[25rem] min-h-[30rem] p-8 items-center justify-center rounded-lg z-10 ${styles['custom-glass-card']}`}>
            
            </div>
        </div>
    );
}