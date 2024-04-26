import styles from '../../styles.module.css';


interface BubbleProps {
    name: string;
}


const Bubble: React.FC<BubbleProps> = ({ name }) => {


    return (
        <div className={`${styles['bubble']} rounded-full transition duration-450 ease-in-out transform hover:scale-125`}>
            {name}
        </div>
    );
}

export default Bubble;
